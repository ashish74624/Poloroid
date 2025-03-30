'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import GithubLogo from '../Icons/GithubLogo'

import { usePathname } from 'next/navigation';

export const sidebarArray = [
  {
    name: "Home",
    href: "/home"
  },
  {
    name: "Profile",
    href: "/profile"
  },
  {
    name: "Friends",
    href: "/friends"
  },
  {
    name: "Notifications",
    href: "/notifications"
  },
  {
    name: "FAQ",
    href: "/faq"
  },
]



export default function Sidebar() {

  const pathname = usePathname();

  // Define pages where the sidebar should be hidden
  const noSidebarRoutes = ['/'];

  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
  }, [pathname]);

  return (

    <aside className={` overflow-hidden ${!noSidebarRoutes.includes(pathname) ? 'block' : 'hidden'} w-[18%]  border-r border-borderColor `}>
      <div className='bg-[#F8F8F8] flex flex-col items-center space-y-1 md:space-y-2 mt-4 px-2 font-medium  '>
        <h1 className={"text-2xl lg:text-3xl  bg-clip-text text-[#58b8e8] mb-6 "}>
          poloroid
        </h1>
        {
          sidebarArray.map((item, i) => (
            <SidebarNavs key={i} href={`${item.href}/${email}`} name={item.name} />
          ))
        }

        <a className=' rounded-lg focus:outline-[#F8C732] px-4 bg-[#181717] hover:bg-white hover:border hover:border-black hover:text-black transition py-1 text-white lg:max-w-[250px] w-full flex justify-center text-lg' href="https://github.com/ashish74624/MERNsocial" target='_blank'>
          <div className='flex space-x-2 h-10'>
            <span className=''><GithubLogo /></span>
            <span className=' self-center'>GitHub</span>
          </div>
        </a>
      </div>
    </aside>

  )
}

interface NavProps {
  href: string;
  name: string;
}

export function SidebarNavs({ href, name }: NavProps) {
  return (
    <Link className=' focus:outline-[#F8C732] px-4 py-2 bg-[#58b8e8] text-white rounded-lg lg:max-w-[250px] w-full flex justify-center  text-lg' href={href}>
      {name}
    </Link>
  )
}