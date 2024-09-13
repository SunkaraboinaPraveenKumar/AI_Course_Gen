import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { Input } from '@/components/ui/input';
import { storage } from '@/configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { CourseList } from '@/configs/schema';
import Link from 'next/link';
function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner)
    }
  }, [course])
  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    const fileName = Date.now() + ".jpg"
    const storageRef = ref(storage, 'ai-course/' + fileName);
    await uploadBytes(storageRef, file).then((snapShot) => {
      console.log("Uploaded file Successfully");
    }).then((resp) => {
      getDownloadURL(storageRef).then(async (downloadUrl) => {
        console.log(downloadUrl);
        await db.update(CourseList).set({
          courseBanner: downloadUrl
        })
          .where(eq(CourseList.id, course?.id))
      })
    })
  }
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <h2 className='font-bold text-2xl'>{course?.courseOutput?.CourseName} {edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData()} />}</h2>
          <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.Description}</p>
          <h2 className='font-medium flex gap-2 mt-2 items-center'><HiOutlinePuzzle />{course?.category}</h2>
          {
            !edit &&
            <Link href={'/course/' + course?.courseId + "/start"}>
              <Button className='w-full mt-5'>Start</Button>
            </Link>
          }
        </div>
        <div className='mt-3 ml-3'>
          <label htmlFor="upload-image">
            <Image src={selectedFile ? selectedFile : '/placeholder.png'} width={300} height={300} className='w-full rounded-xl h-[250px] object-cover cursor-pointer' />
          </label>
          {edit && <Input type='file' id='upload-image' className='opacity-0' onChange={onFileSelected} />}
        </div>
      </div>
    </div>
  )
}

export default CourseBasicInfo