import React from 'react'
import Link from 'next/link'
import { Comfortaa } from 'next/font/google'
import { Cormorant_Garamond } from "next/font/google"
import Ripple from './Components/ui/ripple'

const Com = Comfortaa({
  subsets: ['latin'],
  weight: '600'
})

const cor = Cormorant_Garamond({
  subsets: ['cyrillic'],
  weight: '400'
})

export default function Home() {
  return (
    <main className='bg-[#58b8e8] h-screen lg:h-[100svh] w-screen flex flex-col pb-40 justify-center items-center space-y-5'>
      <h1 className={`${Com.className} text-7xl md:text-8xl text-[#f5f5f7]`}>poloroid</h1>
      <p className='text-[#f5f5f7] text-base md:text-lg'>Where your memories are always in focus</p>
      <div className='flex space-x-4'>
        <HomePageBtn name='Login' link='/login' />
        <HomePageBtn name='Sign Up' link='/register' />
      </div>
      <h1 className="text-white">Created by : <a className='  text-xl hover:underline' href="https://ashish74624.vercel.app" target='_blank'>Ashish Kumar</a></h1>
      <Ripple />
    </main>
  )
}

interface HomePageBtnProps {
  name: string;
  link: string;
}

function HomePageBtn({ name, link }: HomePageBtnProps) {
  return (
    <Link href={link} className='bg-white w-24 h-11 flex justify-center items-center focus:border-[#F8C732] focus:border-2 focus:outline-none rounded-md  text-[#58b8e8] text-base md:text-lg active:border-[#58b8e8] active:border-2 active:text-[#F8C732] hover:outline-[#F8C732] hover:outline transition-all'>
      {name}
    </Link>
  )
}