'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const CreateTeam = () => {
    const [teamName, setTeamName] = useState("") 
    const {user}:any = useKindeBrowserClient()
    const createTeam = useMutation(api.teams.createTeam)

    const router = useRouter()
    const createNewTeam = ()=>{
        createTeam({
            teamName: teamName,
            createdBy : user?.email
        })
        .then((resp)=>{
            console.log(resp);
            if(resp){
                router.push('/dashboard')
                toast('Team created successfully')
            }
        })
    }
  return (
    <div className='px-6 md:p-16 my-16'>
        <Image src='/eraser.svg' alt='image' width={200} height={200}/>
        <div className='flex flex-col items-center'>
            <h2 className='font-bold text-[40px] py-3'>What should we call your team?</h2>
            <h2 className='text-gray-500'>You can always change this later from</h2>
            <div className='mt-7 w-[40%]'>
                <label className='text-gray-500' htmlFor="">Team Name</label>
                <Input onChange={(e)=>setTeamName(e.target.value)} className='mt-3'/>
            </div>
            <Button 
            onClick={()=>createNewTeam()}
            disabled={!(teamName && teamName?.length >0)} className='bg-blue-500 mt-9 w-[30%] hover:bg-blue-700'>Create Team</Button>
        </div>  
    </div>
  )
}

export default CreateTeam