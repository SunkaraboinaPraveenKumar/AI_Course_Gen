import React from 'react';
import { HiOutlineClock } from 'react-icons/hi2';

function ChapterListCard({ chapter, index }) {
    return (
        <div className='grid grid-cols-5 md:grid-cols-5 p-3 items-center border-b gap-3 md:gap-4'>
            <div className='flex justify-center items-center'>
                <h2 className='p-1 bg-primary w-8 h-8 text-white rounded-full text-center text-xs md:text-base'>
                    {index + 1}
                </h2>
            </div>
            <div className='col-span-4'>
                <h2 className='font-medium text-sm md:text-base'>{chapter?.ChapterName}</h2>
                <h2 className='flex items-center gap-1 text-xs md:text-sm text-primary'>
                    <HiOutlineClock />
                    {chapter?.Duration}
                </h2>
            </div>
        </div>
    );
}

export default ChapterListCard;
