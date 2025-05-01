import React from 'react'
import { Comfortaa } from 'next/font/google'
import NavbarSkel from '@/app/Skels/NavbarSkel'
import Sidebar from '@/app/Components/Sidebar'
import PostSkel from '@/app/Skels/PostSkel'
import UserSkel from '@/app/Skels/UserSkel'


const Com = Comfortaa({
  subsets: ['cyrillic'],
  weight: '400'
})


export default function loading() {
  return (

    <main className=' h-screen w-screen grid place-content-center'>
      <PostSkel />
    </main>
  )
}
