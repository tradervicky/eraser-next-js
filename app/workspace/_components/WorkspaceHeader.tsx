import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const WorkspaceHeader = () => {
  return (
    <div className='p-3 border-b flex justify-between items-center'>
      <div className='flex gap-2 items-center '>
      <Image src="/eraser-logo.png" alt='Logo' width={40} height={40}/>
      <h2>File Name</h2>
      </div>
      <Button className='h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700'>Share <Link className='h-4 w-4'/></Button>
    </div>
  )
}

export default WorkspaceHeader