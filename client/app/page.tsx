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
    <main className='bg-primaryBlue h-screen lg:h-[100svh] flex flex-col pb-40 justify-center items-center space-y-5'>
      <h1 className={`${Com.className} text-7xl md:text-8xl text-[#f5f5f7]`}>poloroid</h1>
      <p className='text-[#f5f5f7] text-base md:text-lg'>Where your memories are always in focus</p>
      <div className='flex space-x-4'>
        <HomePageButton name='Login' link='/login' />
        <HomePageButton name='Sign Up' link='/register' />
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

function HomePageButton({ name, link }: HomePageBtnProps) {
  return (
    <Link href={link} className='bg-white w-24 h-11 flex justify-center items-center focus:border-primaryYellow focus:border-2 focus:outline-none rounded-md  text-primaryBlue text-base md:text-lg active:border-primaryBlue active:border-2 active:text-primaryYellow hover:outline-primaryYellow hover:outline transition-all'>
      {name}
    </Link>
  )
}