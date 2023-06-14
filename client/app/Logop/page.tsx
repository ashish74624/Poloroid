import React from 'react'
import Logo from '../Components/Logo'
import Star from '../Components/Star'

export default function Logop() {
  return (
    <main className='h-screen w-screen flex justify-center items-center'>
      <div className='flex flex-col space-y-4'>
        <span className=''><Star/></span>
        <span className=' ml-6'><Star/></span>
        <span className=' ml-12'><Star/></span>
      </div>
    </main>
  )
}
