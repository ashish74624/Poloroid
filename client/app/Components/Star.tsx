import React from 'react'
import Image from 'next/image'

export default function Star() {
  return (
    <div className='flex relative'>
      <span className=" h-[20px] w-[20px] bg-yellow-500 rotate-45 relative z-10 animate-glow3 "></span>
      <span className='bg-yellow-400 w-[80px] h-[5px] -rotate-45 rtr absolute mt-3 ml-2 animate-glow'></span>
    </div>
  )
}
