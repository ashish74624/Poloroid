import React from 'react'
import Image from 'next/image'

export default function Poster() {
  return (
    <>
     <div className= 'relative h-screen w-[45vw]' >
            <Image className=' opacity-60 absolue inset-0 h-screen w-[45vw]' src={'/stay.jpg'} alt='Image' width={100} height={100} />    
            <div className='  absolue inset-0 h-screen w-[45vw] bg-purple-900' ></div>
        </div>   
    </>
  )
}
