import React from 'react'
import Link from 'next/link'
import { Comfortaa } from 'next/font/google'

const Com = Comfortaa({
    subsets:['latin'],
    weight:'400'
  })
  

export default function Landing() {
  return (
    <>
     <main className='bg-[#58b8e8] h-screen w-screen flex flex-col pt-44 items-center space-y-5'>
        <h1 className={`${Com.className} text-7xl md:text-8xl text-[#f5f5f7]`}>polaroid</h1>
        <p className='text-[#f5f5f7] text-base md:text-lg'>Where your memories are always in focus</p>
        <div className='flex space-x-4'>
          <button className='bg-white w-24 h-11 flex justify-center items-center focus:border-[#F8C732] focus:border-2 focus:outline-none rounded-md  text-[#58b8e8] text-base md:text-lg transition duration-200 ease-in active:border-[#58b8e8] active:border-2 active:text-[#F8C732]'>
            <Link className=' focus:outline-none ' href={'/login'}>
                Login
            </Link>
          </button>
          <button className='bg-white w-24 h-11 flex justify-center items-center focus:border-[#F8C732] focus:border-2 focus:outline-none rounded-md  text-[#58b8e8] text-base md:text-lg transition duration-200 ease-in '>
            <Link className=' focus:outline-none' href={'/register'}>
              Sign up
            </Link>
          </button>
        </div>
    </main> 
    </>
  )
}
