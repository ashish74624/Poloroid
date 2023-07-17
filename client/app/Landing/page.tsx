import React from 'react'
import { Comfortaa } from 'next/font/google'
import Link from 'next/link'

const Comf = Comfortaa({
    subsets:['cyrillic'],
    weight:'400'
  })
  

export default function Landing() {
  return (
    <>
     <main className='bg-[#58b8e8] h-screen w-screen flex flex-col pt-44 items-center space-y-5'>
        <h1 className={`${Comf.className} text-7xl md:text-8xl text-[#f5f5f7]`}>polaroid</h1>
        <p className='text-[#f5f5f7] text-base md:text-lg'>Where your memories are always in focus</p>
        <div>
            <Link href={'/login'}>
            <button className='bg-white w-max h-10 px-4  rounded-md mx-1 md:mx-3 text-[#71b1d1] hover:-translate-y-2   transition duration-200 ease-in hover:shadow-[#F8C732] hover:shadow-lg '>Login</button></Link>
            <Link href={'/register'}>
            <button className='bg-white w-max h-10 px-4  rounded-md mx-1 md:mx-3 text-[#71b1d1] hover:shadow-lg transition duration-200 ease-in hover:-translate-y-2 hover:shadow-[#F8C732]'>Sign up</button></Link>
        </div>
    </main> 
    </>
  )
}
