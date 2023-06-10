import React from 'react'
import Image from 'next/image'
import Logo from './Logo'

export default function Poster() {
  return (
    <>
     <main className= 'relative h-screen w-[45vw] bg-purple-400' >
        <div className='h-[20vw] w-[20vw]'>
          <Logo/>
        </div>
     </main>   
    </>
  )
}
