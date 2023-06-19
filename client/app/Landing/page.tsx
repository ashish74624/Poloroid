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
     <main className='bg-[#71B1D1] h-screen w-screen flex flex-col pt-44 items-center space-y-5'>
        <h1 className={`${Comf.className} text-8xl text-[#f5f5f7]`}>polaroid</h1>
        <p className='text-[#f5f5f7] text-lg'>Where your memories are always in focus</p>
        <div>
            <Link href={'/login'}>
            <button className='bg-[#f5f5f7] w-max h-10 px-4  rounded-lg mx-3 text-[#71b1d1]  hover:bg-gray-300'>Login</button></Link>
            <Link href={'/register'}>
            <button className='bg-[#f5f5f7] w-max h-10 px-4  rounded-lg mx-3 text-[#71b1d1]  hover:bg-gray-300'>Sign up</button></Link>
        </div>
    </main> 
    </>
  )
}
