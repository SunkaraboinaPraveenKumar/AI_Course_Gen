"use client"
import Image from 'next/image'
import React, { useContext } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress"
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
function SideBar() {
    const {userCourseList,setUserCourseList}=useContext(UserCourseListContext);
    const path=usePathname();
    const Menu=[
        {
            id:1,
            name:'Home',
            icon:<IoHomeOutline/>,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Explore',
            icon:<HiOutlineSquare3Stack3D/>,
            path:'/dashboard/explore'
        },
        {
            id:3,
            name:'Upgrade',
            icon:<IoShieldCheckmarkOutline/>,
            path:'/dashboard/upgrade'
        },
        {
            id:4,
            name:'Logout',
            icon:<CiLogout/>,
            path:'/dashboard/logout'
        },
    ]
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
        <Link href={'/'}>
        <Image src={'/logo.png'} width={50} height={50}/>
        </Link>
        <hr className='my-5'/>
        <ul>
            {
                Menu.map((item,index)=>(
                    <Link href={item.path} key={index}>
                    <div className={`
                    flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg
                    ${item.path==path&&'bg-gray-100 text-black mb-2'}
                    `}>
                        <div className='text-3xl'>
                            {item.icon}
                        </div>
                        <h2>{item.name}</h2>
                    </div>  
                    </Link>
                ))
            }
        </ul>
        <div className='absolute bottom-10 w-[80%]'>
            <Progress value={(userCourseList?.length/10)*100} />
            <h2 className='text-sm my-2'>{userCourseList?.length} Out of 10 Courses Created</h2>
            <h2 className='text-xs text-gray-500'>Upgrade your Plan for Unlimited course generation</h2>
        </div>
    </div>
  )
}

export default SideBar