import React from 'react'
import { Comfortaa } from 'next/font/google'
import NavbarSkel from '@/app/Skels/NavbarSkel'
import Sidebar from '@/app/Components/Sidebar'
import PostSkel from '@/app/Skels/PostSkel'
import UserSkel from '@/app/Skels/UserSkel'


const Com = Comfortaa({
    subsets:['cyrillic'],
    weight:'400'
  })
  

export default function loading() {
  return (
    <>
    <main className='h-screem w-screen overflow-hidden'>
      <nav>
        <NavbarSkel/>
      </nav>
      <section className=' h-[91vh] w-screen md:grid flex md:grid-cols-4 lg:grid-cols-5'>
        <div className=' border-r border-gray-600 md:block hidden'><Sidebar /></div>
        <div className=' w-screen md:w-[80vw] lg:w-[60vw] md:col-span-3 overflow-x-hidden overflow-y-scroll flex flex-col items-center bg-[#F8F8F8]'>
            <PostSkel/>
        </div>
        <div className=' lg:block hidden border-l border-gray-600 overflow-x-hidden overflow-y-scroll'>
        <ul className=' overflow-y-scroll  flex flex-col items-center space-y-2 pt-4 right-0'>
            <h3 className='text-base lg:text-xl mb-2'>People you may know</h3>
            <UserSkel/>
            <UserSkel/>
            <UserSkel/>
          </ul>
        </div>
      </section>
    </main>
    </>
  )
}
