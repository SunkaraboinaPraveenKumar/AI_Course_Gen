import React from 'react'
import { HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineClock } from "react-icons/hi";
import { HiOutlineBookOpen, HiOutlinePlayCircle } from 'react-icons/hi2';
function CourseDetail({course}) {
  return (
    <div className='border p-6 rounded-xl shadow-sm mt-3 mb-3'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
            <div className='flex gap-2'>
                <HiOutlineChartBar className='text-4xl text-primary'/>
                <div>
                    <h2 className='text-gray-500 text-xs'>Skill Level</h2>
                    <h2 className='font-medium text-lg '>{course?.level}</h2>
                </div>
            </div>
            <div className='flex gap-2'>
                <HiOutlineClock className='text-4xl text-primary'/>
                <div>
                    <h2 className='text-gray-500 text-xs'>Duration</h2>
                    <h2 className='font-medium text-lg '>{course?.courseOutput?.Duration}</h2>
                </div>
            </div>
            <div className='flex gap-2'>
                <HiOutlineBookOpen className='text-4xl text-primary'/>
                <div>
                    <h2 className='text-gray-500 text-xs'>No Of Chapters</h2>
                    <h2 className='font-medium text-lg '>{course?.courseOutput?.NoOfChapters}</h2>
                </div>
            </div>
            <div className='flex gap-2'>
                <HiOutlinePlayCircle className='text-4xl text-primary'/>
                <div>
                    <h2 className='text-gray-500 text-xs'>Video Included?</h2>
                    <h2 className='font-medium text-lg '>{course?.includeVideo}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseDetail