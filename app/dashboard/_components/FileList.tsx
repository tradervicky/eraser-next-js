'use client'
import { FileListContext } from '@/app/context/FileListContext'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { MoreHorizontal } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

export interface FILE{
  archive : boolean,
  createdby : string,
  document : string,
  fileName : string,
  teamId:string,
  whiteBoard:string,
  _id:string,
  _creationTime: number
}
const FileList = () => {
const {fileList_, setFileList_} = useContext(FileListContext)
const [filelist, setFileList] = useState<any>()
const {user}:any = useKindeBrowserClient();
useEffect(()=>{
  fileList_ && setFileList(fileList_);
  console.log(filelist)
},[fileList_])
  return (
    <div className='mt-10'>
<div className="overflow-x-auto">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File name</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited</td>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</td>      
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
      {filelist && filelist?.map((file:FILE,index:number )=>
      <tr>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format('DD MMM YYYY') }</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700"><Image src={user?.picture} alt='user' width={30} height={30} className='rounded-full'/></td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700"><MoreHorizontal className='cursor-pointer'/></td>
      </tr>)}

      

      
    </tbody>
  </table>
</div>
</div>
  )
}

export default FileList