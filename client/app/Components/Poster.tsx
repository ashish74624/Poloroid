import React from 'react'
import Image from 'next/image'
import Logo from './Logo'

export default function Poster() {
  return (
    <main className= 'relative h-screen w-[45vw]'>
     <section id="stars-container" className= 'h-screen w-[45vw] bg-gradient-to-r relative from-purple-800 to-purple-400'>
     </section>  
     <section className='top-0  absolute h-screen w-[45vw]'>
      <Logo/>
     </section> 
    </main>
  )
}
