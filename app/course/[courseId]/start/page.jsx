"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'

function CourseStart({ params }) {
  const [selectedChapter, setSelectedChapter] = useState();
  const [course, setCourse] = useState();
  const [chapterContent, setChapterContent] = useState();

  useEffect(() => {
    params && GetCourse();
  }, [params]);

  const GetCourse = async () => {
    const result = await db.select().from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));
    setCourse(result[0]);
  };

  const GetSelectedChapterContent = async (chapterId) => {
    const result = await db.select().from(Chapters)
      .where(and(eq(Chapters?.chapterId, chapterId), eq(Chapters?.courseId, course?.courseId)));
      setChapterContent(result[0]);
  };

  return (
    <div>
      {/* chapter list sidebar */}
      <div className='fixed md:w-72 hidden md:block h-screen border-r shadow-sm'>
        <h2 className='font-medium text-lg bg-primary p-3 text-white'>{course?.courseOutput?.CourseName}</h2>
        {
          course?.courseOutput?.Chapters?.map((chapter, index) => (
            <div
              key={index} className={`cursor-pointer hover:bg-purple-50 ${selectedChapter?.ChapterName === chapter?.ChapterName && 'bg-purple-200'}`}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))
        }
      </div>
      {/* Content Div */}
      <div className='md:ml-64'>
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;
