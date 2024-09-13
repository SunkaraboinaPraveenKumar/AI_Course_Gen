"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
import { Button } from '@/components/ui/button';

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    const result = await db.select().from(CourseList)
      .limit(9)
      .offset(pageIndex * 9);
    setCourseList(result);
  };

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <h2 className='font-bold text-2xl sm:text-3xl text-center sm:text-left'>Explore More Projects</h2>
      <p className='text-center sm:text-left'>Explore More Projects Built by Other Users</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
        {courseList?.map((course, index) => (
          <div key={index}>
            <CourseCard course={course} displayUser={true} />
          </div>
        ))}
      </div>
      <div className='flex justify-between items-center mt-5'>
        {pageIndex !== 0 && (
          <Button onClick={() => setPageIndex(pageIndex - 1)} className='w-full sm:w-auto mr-3'>
            Previous Page
          </Button>
        )}
        <Button onClick={() => setPageIndex(pageIndex + 1)} className='ml-auto w-full sm:w-auto'>
          Next Page
        </Button>
      </div>
    </div>
  );
}

export default Explore;
