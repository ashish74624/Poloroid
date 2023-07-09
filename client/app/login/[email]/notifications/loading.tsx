import React from 'react'
import Navbar from '@/app/Components/Navbar'
import NotfSkel from '@/app/Components/NotfSkel'

export default function loading() {
  return (
    <>
     <Navbar navData={false}/> 
     <section className='h-[91vh] w-screen bg-[#F8F8F8] flex flex-col items-center'>
        <NotfSkel/>
        <NotfSkel/>
     </section>
    </>
  )
}
