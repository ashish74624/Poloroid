import React from 'react'
import Link from 'next/link'
import GithubLogo from '../Icons/GithubLogo'


export default function Sidebar({email}:any) {
  return (
    <>
      <main className=' overflow-hidden  '>
        <ul className='bg-[#F8F8F8] flex flex-col items-center space-y-1 md:space-y-2 pt-4 font-serif font-medium'>
            <Link className=' rounded-lg focus:outline-[#F8C732]'  href={`/home/${email}`}>
              <li className="px-4 py-2  bg-[#58b8e8] text-white rounded-lg w-44 md:w-[20vw] lg:w-[15vw] flex justify-center  text-lg">Home</li>
            </Link>
            <Link className=' rounded-lg focus:outline-[#F8C732]' href={`/friends/${email}`}>
              <li className="px-4 py-2 bg-[#58b8e8]  text-white rounded-lg w-44 md:w-[20vw] lg:w-[15vw]  flex justify-center  text-lg">
                Friends
              </li>
            </Link>
            <Link className=' rounded-lg focus:outline-[#F8C732]' href={`/notifications/${email}`}>
              <li className="px-4 py-2 bg-[#58b8e8]  text-white rounded-lg w-44 md:w-[20vw] lg:w-[15vw]  flex justify-center  text-lg">
                Notifications
              </li>
            </Link>
            <Link className=' rounded-lg focus:outline-[#F8C732]' href={`/faq/${email}`}>
              <li className="px-4 py-2 bg-[#58b8e8]  text-white rounded-lg w-44 md:w-[20vw] lg:w-[15vw]  flex justify-center  text-lg">
                FAQ
              </li>
            </Link>
            <a className=' rounded-lg focus:outline-[#F8C732]' href="https://github.com/ashish74624/MERNsocial" target='_blank'>
            <li className="px-4 bg-[#181717] hover:bg-white hover:border hover:border-black hover:text-black transition py-1 text-white rounded-lg w-44 md:w-[20vw] lg:w-[15vw] flex justify-center text-lg">
              <div className='flex space-x-2 h-10'>
                <span className=''><GithubLogo/></span>
                <span className=' self-center'>GitHub</span>
              </div>
                
              </li>
            </a>
        </ul>
      </main>
    </>
  )
}
