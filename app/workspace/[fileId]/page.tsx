'use client'
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'

const Workspace = ({params}:any) => {
  const [triggerSave, setTriggersave] = useState(false)
  useEffect(()=>{
    console.log("fileId",params)
  },[])
  return (
    <div>
        <WorkspaceHeader onSave={()=>setTriggersave(!triggerSave)}/>
        {/* Work space layout  */}
        <div className='grid grid-cols-1 md:grid-cols-2'>
          {/* Document  */}
            <div className='bg-white h-screen'>
                <Editor onSaveTrigger={triggerSave} fileId={params.fileId}/>
            </div>
            {/* Canvas  */}
            <div className=' bg-red-400 h-screen'>
               Canvas
            </div>
        </div>
    </div>
  )
}

export default Workspace