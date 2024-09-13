"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
  
function EditChapters({course,index,refreshData}) {
    const Chapters=course?.courseOutput?.Chapters;
    const [name,setName]=useState()
    const [about,setAbout]=useState();
    useEffect(()=>{
        setName(Chapters[index].ChapterName);
        setAbout(Chapters[index].About);
    },[course])
    const onUpdateHandler=async()=>{
        course.courseOutput.Chapters[index].ChapterName=name;
        course.courseOutput.Chapters[index].About=about;
        const result=await db.update(CourseList).set({
            courseOutput:course?.courseOutput
        })
        .where(eq(CourseList?.id,course?.id))
        refreshData(true)
    }
    return (
        <Dialog>
            <DialogTrigger><HiPencilSquare/></DialogTrigger>
            <DialogContent className='bg-white text-black'>
                <DialogHeader>
                    <DialogTitle>Edit Chapter</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Course Title</label>
                            <Input defaultValue={Chapters[index].ChapterName} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div className='mt-3'>
                            <label>About</label>
                            <Textarea className='h-20' defaultValue={Chapters[index].About} onChange={(e)=>setAbout(e.target.value)}/>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={onUpdateHandler}>Update</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default EditChapters