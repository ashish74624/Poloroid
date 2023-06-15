import React from 'react'
import Logo from './Logo'

export default function Poster() {
  return (
    <main className= 'relative h-screen w-[45vw]'>
     <section  className= 'h-screen w-[45vw] bg-gradient-to-r relative from-purple-800 to-purple-400'>
     </section>  
     <section className='top-0  absolute h-screen w-[45vw]'>
      <Logo/>
     </section> 
    </main>
  )
}
