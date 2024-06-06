"use client";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import { FileListContext } from "../context/FileListContext";
// import {api} from 'path/to/api'

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user, isAuthenticated, isLoading }:any = useKindeBrowserClient();
  const convex = useConvex();
  const router = useRouter();
const [fileList_, setFileList_] = useState()
  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated); // Log authentication status
    console.log('isLoading:', isLoading); // Log loading status
    console.log('User:', user); // Log user information
    if (!isLoading && isAuthenticated && user) {
      checkTeam();
    }
  }, [isAuthenticated, isLoading, user]);

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    console.log('Result length:', result.length); 
    if (result.length === 0) {
      router.push("teams/create");
    }
  };
  if (isLoading) {
    return <div>Loading...</div>; 
  }
  if (!isAuthenticated) {
    return <div>Please log in</div>; 
  }

  return (
    <div>
      <FileListContext.Provider value={{fileList_, setFileList_}}>
      <div className="grid grid-cols-4">
        <div className="h-screen w-72 fixed">
          <SideNav />
        </div>
        <div className="col-span-4 ml-72">{children}</div>
      </div>
      </FileListContext.Provider>
    </div>
  );
};

export default DashboardLayout;
