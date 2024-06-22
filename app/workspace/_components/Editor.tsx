'use client'
import EditorJS from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Checklist from '@editorjs/checklist'
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';


const rawDocument = {
    "time" : 1550476186479,
    "blocks" : [
        {
        data:{
            text:"Document Name",
            level:2
        },
        id:"123",
        type:'header'
    },
        {
        data:{
            level:4
        },
        id:"1234",
        type:'header'
    },
],
    "version" : "2.8.1"
}
const Editor = ({onSaveTrigger,fileId}:any ) => {
    const ref = useRef<EditorJS>();
    const updateDocument = useMutation(api.files.updateDocument)
    const [document, setDocument] = useState(rawDocument)
    useEffect(()=>{
        initEditor()
    },[])
    useEffect(()=>{
        console.log("triggered value", onSaveTrigger)
       onSaveTrigger && onSaveDocument();
    },[onSaveTrigger])
    const initEditor = ()=>{

        const editor = new EditorJS({
            /**
             * Id of Element that should contain Editor instance
             */
            tools:{
                header:{
                    class: Header,
                    shortcut: 'CMD+SHIFT+H',
                    config:{
                        placeholder:'Enter a Header'
                    }
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                      defaultStyle: 'unordered'
                    }
                  },
                  checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                  },
                  paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                  },
                  
            }, 
            holder: 'editorjs',
            data:document
          });
          ref.current = editor;
    }

    const onSaveDocument = ()=>{
        if(ref.current)
            {
                ref.current.save().then((outputData) => {
                    console.log('Article data: ', outputData)
                    updateDocument({
                        _id:fileId,
                        document:JSON.stringify(outputData)
                    }).then(resp=>{
                        
                                toast("Documented updated")
                    },(e)=>{
                        toast("Server error")
                    }
                )

                  }).catch((error) => {
                    console.log('Saving failed: ', error)
                  });
            }
    }


  return (
    <div>
        <div id='editorjs' className='ml-20'></div>
    </div>
  )
}

export default Editor