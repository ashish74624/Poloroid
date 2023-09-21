import React from 'react'
import Link from 'next/link'
import GithubLogo from '../Icons/GithubLogo'


export default function Sidebar2({email}:any) {
  return (
    <>
      <main className='w-full'>
        <ul className='w-full'>
            <Link className=' rounded-lg focus:outline-[#F8C732]'  href={`/home/${email}`}>
              <li className="px-4 py-2  bg-[#58b8e8] text-white rounded-lg w-full md:w-[20vw] lg:w-[15vw] flex justify-center  text-lg mb-2">Home</li>
            </Link>
            <Link className=' rounded-lg focus:outline-[#F8C732]' href={`/friends/${email}`}>
              <li className="px-4 py-2 bg-[#58b8e8]  text-white rounded-lg w-full md:w-[20vw] lg:w-[15vw]  flex justify-center  text-lg mb-2">
                Friends
              </li>
            </Link>
            <Link className=' rounded-lg focus:outline-[#F8C732]' href={`/ppl/${email}`}>
              <li className="px-4 py-2 bg-[#58b8e8]  text-white rounded-lg w-full md:w-[20vw] lg:w-[15vw]  flex justify-center  text-lg mb-2">
                People You May Know
              </li>
            </Link>
            <Link className=' rounded-lg focus:outline-[#F8C732]' href={`/notifications/${email}`}>
              <li className="px-4 py-2 bg-[#58b8e8]  text-white rounded-lg w-full md:w-[20vw] lg:w-[15vw]  flex justify-center  text-lg mb-2">
                Notifications
              </li>
            </Link>
            <Link className=' rounded-lg focus:outline-[#F8C732]' href={`/faq/${email}`}>
              <li className="px-4 py-2 bg-[#58b8e8]  text-white rounded-lg w-full md:w-[20vw] lg:w-[15vw]  flex justify-center  text-lg mb-2">
                FAQ
              </li>
            </Link>
            <a className=' rounded-lg focus:outline-[#F8C732]' href="https://github.com/ashish74624/MERNsocial" target='_blank'>
            <li className="px-4 bg-[#181717] hover:bg-white hover:border hover:border-black hover:text-black transition py-1 text-white rounded-lg w-full md:w-[20vw] lg:w-[15vw] flex justify-center text-lg mb-2">
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
