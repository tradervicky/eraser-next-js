'use client'
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useConvex, useMutation, useQuery } from "convex/react"
import { convexToJson } from "convex/values"
import { useEffect } from "react"
import Header from "./_components/Header"
import FileList from "./_components/FileList"

const Dashboard = () => {
  const {user}:any = useKindeBrowserClient();
  const convex = useConvex()
  // const getUser = useQuery(api.user.getUser, {email: user?.email})
  useEffect(() => {
   if(user){
   checkUser()
   }
  }, [user])

  const checkUser = async()=>{
    const result = await convex.query(api.user.getUser, {email:user?.email})
    if(!result?.length){
      createUser({
        name:user.given_name,
        email: user.email,
        image : user.picture
      })
      .then((resp)=>{
        console.log(resp)
      })
    }
  }
  
const createUser = useMutation(api.user.createUser)

  return (
    <div className="p-8">
      <Header/>
      <FileList/>
    </div>
  )
}

export default Dashboard