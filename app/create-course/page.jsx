"use client"
import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react'
import { HiClipboardDocumentCheck, HiLightBulb, HiMiniSquares2X2 } from "react-icons/hi2";
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { GenerateCourseLayout_AI } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';
import { CourseList } from '@/configs/schema';
import uuid4 from 'uuid4';
import { db } from '@/configs/db';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
function CreateCourse() {
    const {userCourseInput,setUserCourseInput}=useContext(UserInputContext);
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    // useEffect(()=>{
    //     console.log(userCourseInput);
    // },[userCourseInput]);
    const {user}=useUser();
    const checkStatus=()=>{
        if(userCourseInput?.length==0){
            return true;
        }
        if(activeIdx==0&&(userCourseInput?.category?.length==0||userCourseInput?.category==undefined)){
            return true;
        }
        if(activeIdx==1&&(userCourseInput?.topic?.length==0||userCourseInput?.topic==undefined)){
            return true;
        }
        if(activeIdx==2&&(userCourseInput?.level==undefined||userCourseInput?.duration==undefined||userCourseInput?.displayVideo==undefined||userCourseInput?.noOfChapters==undefined)){
            return true;
        }
        return false;
    }
    const GenerateCourseLayout=async()=>{
        setLoading(true);
        const BASIC_PROMPT='Generate A Course Tutorial on Following Detail With field CourseName,Description,Along with chapterName, about , Duration, Level '
        const USER_INPUT_PROMPT=`Category: ${userCourseInput?.category},Topic: ${userCourseInput?.topic}, Description:${userCourseInput?.description} , Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOfChapters: ${userCourseInput?.noOfChapters}, in JSON format`
        const FINAL_PROMPT=BASIC_PROMPT+USER_INPUT_PROMPT;
        // console.log(FINAL_PROMPT);
        const result=await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
        // console.log(result?.response?.text())
        // console.log(JSON.parse(result?.response?.text()))
        setLoading(false);
        SaveCourseLayoutInDb(JSON.parse(result?.response?.text()));
    }
    const SaveCourseLayoutInDb=async(courseLayout)=>{
        var id=uuid4();
        setLoading(true);
        const result=await db.insert(CourseList).values({
            courseId: id,
            name:userCourseInput?.topic,
            level:userCourseInput?.level,
            includeVideo:userCourseInput?.displayVideo,
            category:userCourseInput?.category,
            courseOutput:courseLayout,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            userName:user?.fullName,
            userProfileImage:user?.imageUrl
        })
        // console.log(result);
        setLoading(false);
        router.replace('/create-course/'+id);
    }
    const SteperOptions = [
        {
            id: 1,
            name: 'Category',
            icon: <HiMiniSquares2X2 />,
        },
        {
            id: 2,
            name: 'Topic & Desc',
            icon: <HiLightBulb />,
        },
        {
            id: 1,
            name: 'Options',
            icon: <HiClipboardDocumentCheck />,
        },
    ]
    const [activeIdx, setActiveIdx] = useState(0);
    return (
        <div>
            {/*Stepper  */}
            <div className='flex flex-col justify-center items-center mt-10'>
                <h2 className='text-4xl text-primary font-medium'>Create Course</h2>
                <div className='flex mt-10'>
                    {
                        SteperOptions.map((item, index) => (
                            <div className='flex items-center'>
                                <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                                    <div className={`bg-gray-200 p-3 rounded-full text-white ${activeIdx >= index && 'bg-purple-500'}`}>
                                        {item.icon}
                                    </div>
                                    <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                                </div>
                                {index != SteperOptions?.length - 1 && <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIdx >= index && 'bg-purple-500'}`}></div>}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='px-10 md:px-20 lg:px-44 mt-10'>
                {/* Components */}
                    {activeIdx==0?<SelectCategory/>:
                    activeIdx==1?<TopicDescription/>:
                    activeIdx==2?<SelectOption/>:null}
                {/* next and Prev Button */}
                <div className='flex justify-between mt-10 mb-2'>
                    <Button disabled={activeIdx == 0} onClick={() => setActiveIdx(activeIdx - 1)}>Previous</Button>
                    {activeIdx<2 && <Button disabled={checkStatus()} onClick={() => setActiveIdx(activeIdx + 1)}>Next</Button>}
                    {activeIdx==2 && <Button disabled={checkStatus()} onClick={()=>GenerateCourseLayout()}>Generate Course Layout</Button>}
                </div>
            </div>
            <LoadingDialog loading={loading}/>
        </div>
    )
}

export default CreateCourse