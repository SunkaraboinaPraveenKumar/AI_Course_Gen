"use client"
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useContext } from 'react';

function AddCourse() {
  const {userCourseList, setUserCourseList} = useContext(UserCourseListContext);
  const {user} = useUser();

  return (
    <div className='flex flex-col sm:flex-row justify-between sm:gap-2'>
      <div className='mb-4 sm:mb-0'>
        <h2 className='text-xl sm:text-2xl'>Hello, <span className='font-bold'>{user?.fullName}</span></h2>
        <p className='text-sm text-gray-500'>
          Create New Course with AI, Share With friends and Earn from it.
        </p>
      </div>
      <Link href={userCourseList?.length >= 10 ? '/dashboard/upgrade' : '/create-course'}>
        <Button className='bg-yellow-400 w-full sm:w-auto'>
          ➕ Create AI Course
        </Button>
      </Link>
    </div>
  );
}

export default AddCourse;
