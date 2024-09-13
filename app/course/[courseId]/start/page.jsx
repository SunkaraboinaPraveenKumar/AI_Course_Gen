"use client";
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import ChapterListCard from './_components/ChapterListCard';
import ChapterContent from './_components/ChapterContent';
import { Button } from '@/components/ui/button';  // Button for sidebar toggle

function CourseStart({ params }) {
  const [selectedChapter, setSelectedChapter] = useState();
  const [course, setCourse] = useState();
  const [chapterContent, setChapterContent] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Toggle for mobile sidebar

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
    <div className="flex flex-col md:flex-row">
      {/* Mobile sidebar toggle button */}
      <div className="md:hidden p-4">
        <Button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? 'Close Chapters' : 'Show Chapters'}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-40 md:z-auto inset-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-72 transition-transform duration-300 ease-in-out bg-white shadow-lg md:shadow-none h-full md:h-screen md:border-r`}
      >
        <h2 className="font-medium text-lg bg-primary p-3 text-white">
          {course?.courseOutput?.CourseName}
        </h2>
        {
          course?.courseOutput?.Chapters?.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-purple-50 ${selectedChapter?.ChapterName === chapter?.ChapterName && 'bg-purple-200'}`}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index);
                setSidebarOpen(false); // Close sidebar on mobile when a chapter is selected
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))
        }
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 md:ml-72 flex justify-center items-center">
        {selectedChapter ? (
          <ChapterContent chapter={selectedChapter} content={chapterContent} />
        ) : (
          <p className="text-center text-gray-500">Please select a chapter to view its content.</p>
        )}
      </div>
    </div>
  );
}

export default CourseStart;
