'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Header = () => {
    const {user}:any = useKindeBrowserClient();
  return (
    <div className='flex justify-end gap-2 w-full items-center'>
        <div className='flex gap-2 items-center border rounded-md p-1'>
            <Search className='h-6 w-6 text-gray-500' />
            <Input type='text' placeholder='Search' className='border-none outline-none'/>
        </div>
        <div>
            <Image src={user?.picture} alt='ProfilePic' width={40} height={40} className='rounded-full'/>
        </div>
        <Button className='gap-2 flex  bg-blue-600 hover:bg-blue-700'><Send/> Invite</Button>
    </div>
  )
}

export default Header