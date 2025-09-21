"use client"
import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";
import { sidebarArray, SidebarNav } from './Sidebar'
import UploadFile from './UploadFile'


export default function SidebarContent() {
   const pathname = usePathname();
    const [email, setEmail] = useState<string>("");
    const router = useRouter();
  
    useEffect(() => {
      setEmail(localStorage.getItem("email") ?? "");
    }, [pathname]);
  

    const logoutFn = () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("email");
        router.push("/");
      }
    };
  
  return (
    <div className="bg-[#F8F8F8] flex flex-col items-center space-y-2 mt-4 px-2 font-medium">
      <h1 className="text-2xl lg:text-3xl text-[#58b8e8] mb-6 hidden md:block">
        polaroid
      </h1>

      {sidebarArray.map((item, i) => (
        <SidebarNav key={i} href={`${item.href}/${email}`} name={item.name} />
      ))}

      <Dialog>
        <DialogTrigger className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus:outline-[#F8C732] bg-primaryYellow text-primary-foreground shadow h-9 px-4 py-2">
          Add Post
        </DialogTrigger>
        <DialogContent>
          <UploadFile/>
        </DialogContent>
      </Dialog>

      <a
        className="w-full"
        href="https://github.com/ashish74624/MERNsocial"
        target="_blank"
      >
        <Button className="flex space-x-2 h-10 w-full">
          GitHub
        </Button>
      </a>

      <Button onClick={logoutFn} className="w-full">
        Logout
      </Button>
    </div>
  )
}
