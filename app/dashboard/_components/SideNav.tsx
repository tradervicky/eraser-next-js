import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import SideNavTopSection, { TEAM } from './SideNavTopSection';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import SideNavBottomSection from './SideNavBottomSection';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FileListContext } from '@/app/context/FileListContext';

const SideNav = () => {
  const { user } = useKindeBrowserClient();
  const convex = useConvex()
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<TEAM | null>(null);
  const {fileList_, setFileList_} = useContext(FileListContext)
 
//   console.log(activeTeam);
const [totalFiles, setTotalFiles] = useState<Number>()

  const onFileCreate = (filename: string) => {
    console.log(filename);
    createFile({
      fileName: filename,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: '',
      whiteboard: '',
    })
      .then(resp => {
        if (resp) {
            getFiles();
          toast("File created successfully");
        }
      })
      .catch(e => {
        toast("Error while creating file");
      });
  };
useEffect(()=>{
    activeTeam && getFiles()
},[activeTeam])
  const getFiles = async ()=>{
    const result = await convex.query(api.files.getFiles, {teamId:activeTeam?._id});
    console.log(result)
    setFileList_(result)
    setTotalFiles(result?.length)
  }

  return (
    <div className='border-[1px] h-screen fixed w-72 border-r p-6 flex flex-col'>
      <div className='flex-1'>
        <SideNavTopSection user={user} setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)} />
      </div>
      <div className=''>
        <SideNavBottomSection totalFiles={totalFiles} onFileCreate={onFileCreate} />
      </div>
    </div>
  );
};

export default SideNav;
