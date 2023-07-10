import React from 'react'
import { Comfortaa } from 'next/font/google'
import NavbarSkel from '@/app/Components/NavbarSkel'
import Sidebar from '@/app/Components/Sidebar'
import PostSkel from '@/app/Components/PostSkel'
import UserSkel from '@/app/Components/UserSkel'


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
      <section className=' h-[91vh] w-screen grid grid-cols-5'>
        <div className=' border-r border-gray-600'><Sidebar /></div>
        <div className=' col-span-3 overflow-x-hidden overflow-y-scroll flex flex-col items-center'>
            <PostSkel/>
        </div>
        <div className='border-l border-gray-600 overflow-x-hidden overflow-y-scroll'>
        <ul className=' overflow-y-scroll  flex flex-col items-center space-y-2 pt-4 right-0'>
            <h3 className='text-xl mb-2'>People you may know</h3>
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
