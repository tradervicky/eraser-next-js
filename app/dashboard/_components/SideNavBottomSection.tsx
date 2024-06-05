'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Archive, Flag, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DialogClose } from '@radix-ui/react-dialog'

const SideNavBottomSection = ({ onFileCreate, totalFiles }: any) => {
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      icon: Flag,
      path: ''
    },
    {
      id: 2,
      name: "Github",
      icon: Github,
      path: ''
    },
    {
      id: 3,
      name: "Archive",
      icon: Archive,
      path: ''
    },
  ]
  
  const [fileInput, setFileInput] = useState('')
  
  // Calculate the percentage width of the progress bar
  const progressBarWidth = (totalFiles / 5) * 100;

  return (
    <div>
      {menuList.map((data, index) => (
        <h2 key={index} className='flex gap-1 p-2 px-2 text-[14px] hover:bg-gray-100 rounded-md cursor-pointer'>
          <data.icon className='h-5 w-5' />
          {data.name}
        </h2>
      ))}
      
      {/* File button */}
      <Dialog>
        <DialogTrigger className='w-full' asChild>
          <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white justify-start mt-3'>New File</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new File</DialogTitle>
            <DialogDescription>
              <Input placeholder='Enter file Name' className='mt-3' onChange={(e) => setFileInput(e.target.value)} />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" disabled={!(fileInput && fileInput.length > 3)} onClick={() => onFileCreate(fileInput)}>Create</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className='h-3 w-full bg-gray-200 rounded-full mt-4'>
        <div
          className='h-3 bg-blue-600 rounded-full'
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>

      <h2 className='text-[12px] mt-3'>
        <strong>{totalFiles}</strong> out of <strong>5</strong> files used
      </h2>
      
      <h2 className='text-[12px] mt-1'>
        <span className='underline'>Upgrade </span>your plan for unlimited access.
      </h2>
    </div>
  )
}

export default SideNavBottomSection
