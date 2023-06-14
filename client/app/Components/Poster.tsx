import React from 'react'
import Image from 'next/image'
import Logo from './Logo'
import Star from './Star'
import Bgstars from './Bgstars'

export default function Poster() {
  return (
    <main className= 'relative h-screen w-[45vw]'>
     <section id="stars-container" className= 'h-screen w-[45vw] bg-purple-800 relative' >
      <img className=' bg-repeat-x' src={'/starsbg.png'} alt='Image' width={100} height={100}/>
     </section>  
     <section className='top-0  absolute h-screen w-[45vw]'>
      <Logo/>
     </section> 
    </main>
  )
}
