import React from 'react'
import NotfSkel from '@/app/Skels/NotfSkel'
import { Comfortaa } from 'next/font/google'
import { Metadata } from 'next';


export const metadata: Metadata={
  title:'Poloroid | Notifications',
}

const Com = Comfortaa({
  subsets:['cyrillic'],
  weight:'400'
})

export default function loading() {
  return (
    <>
     <nav className=' border-b border-gray-600 bg-[#F8F8F8] w-screen'>
      <div className={`w-[80vw] h-[9vh]  flex justify-center mx-auto items-center`}>
        
          <span className={`${Com.className}  text-3xl  bg-clip-text text-[#58b8e8]`}>
            polaroid
            </span>
            </div>
            </nav>
     <section className='h-[91vh] w-screen bg-[#F8F8F8] flex flex-col items-center'>
        <NotfSkel/>
        <NotfSkel/>
     </section>
    </>
  )
}
