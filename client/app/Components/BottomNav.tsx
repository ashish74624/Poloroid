'use client'
import React, { useState } from 'react'
import HomeIcon from '../Icons/HomeIcon'
import Link from 'next/link'
import Menubtn from '../Icons/Menubtn'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/Components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/Components/ui/sheet"
import SidebarContent from './SidebarContent'
import UploadFile from './UploadFile'
import { usePathname } from 'next/navigation'


export default function BottomNav() {
  const pathname = usePathname();
  const [email, setEmail] = useState<string>("");
  const noSidebarRoutes = ["/", "/login", "/register"];

  return (

    <main className={`fixed w-screen z-50 bottom-0 py-2 flex bg-bgPrimary justify-center border-t border-gray-600  ${noSidebarRoutes.includes(pathname) ? "hidden" : "block"
        } `}>
      <div className=' px-4  w-max rounded-full'>
        <div className='flex w-60 h-12 py-2  items-center justify-between'>
          <Link href={`/home/${email}`}>
            <span className=''><HomeIcon /></span>
          </Link>
          <Dialog>
            <DialogTrigger>
              <span className="flex items-center justify-center bg-gray-900 text-white w-12 h-12 rounded-full focus:outline-2 focus:outline-[#58b8e8]">
                <svg className="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </span>
            </DialogTrigger>
            <DialogContent>
              <UploadFile />
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger>
              <Menubtn />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  <SidebarContent />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </main>

  )
}
