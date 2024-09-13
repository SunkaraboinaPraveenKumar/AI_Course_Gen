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
  
function EditCourseBasicInfo({course,refreshData}) {
    const [name,setName]=useState();
    const [description,setDescription]=useState();
    useEffect(()=>{
        setName(course?.courseOutput?.CourseName);
        setDescription(course?.courseOutput?.Description);
    },[course])
    const onUpdateHandler=async()=>{
        course.courseOutput.CourseName=name;
        course.courseOutput.Description=description;
        const result=await db.update(CourseList).set({
            courseOutput:course?.courseOutput
        })
        .where(eq(CourseList?.id,course?.id))

        refreshData(true);
    }
    return (
        <Dialog>
            <DialogTrigger><HiPencilSquare/></DialogTrigger>
            <DialogContent className='bg-white text-black'>
                <DialogHeader>
                    <DialogTitle>Edit Course Title & Description</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Course Title</label>
                            <Input defaultValue={course?.courseOutput?.CourseName} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div className='mt-3'>
                            <label>Description</label>
                            <Textarea className='h-20' defaultValue={course?.courseOutput?.Description} onChange={(e)=>setDescription(e.target.value)}/>
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

export default EditCourseBasicInfo