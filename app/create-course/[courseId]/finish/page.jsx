"use client"
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { db } from '@/configs/db';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';

function FinishScreen({params}) {
    const { user } = useUser();
  const [course, setCourse] = useState([]);
  const router=useRouter();
  useEffect(() => {
    // console.log(params)
    params && GetCourse()
  }, [params, user])
  const GetCourse = async () => {
    const result = await db.select().from(CourseList)
      .where(and(eq(CourseList.courseId, params?.courseId), eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)))
    setCourse(result[0]);
  }
  return (
    <div className='px-10 md:px-20 lg:px-44 my-7'>
        <h2 className='text-center font-bold text-2xl my-3 text-primary'>Congrats! Your Course is Ready!!</h2>

        
        <CourseBasicInfo course={course} edit={false}/>
        <h2 className='mt-3'>Course URL:</h2>
        <h2 className='text-center text-gray-500 p-2 border rounded flex gap-5 items-center'>{process.env.NEXT_PUBLIC_HOST_NAME}/course/{course?.courseId}/start <HiOutlineClipboardDocumentCheck className='cursor-pointer w-8 h-8' onClick={async()=>await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME+"/course/"+course?.courseId+"/start")}/></h2>
    </div>
  )
}

export default FinishScreen