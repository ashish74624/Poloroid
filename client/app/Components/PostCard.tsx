import React from 'react'
import Image from 'next/image'
import MyIcon from './MyIcon'

export default function PostCard({img,firstName,lastName}:any) {
  return (
    <>
      <div className='bg-[#71B1D1] w-screen h-max flex items-center justify-between p-8 ml-[19vw]'>
        <span className='flex h-max items-center'>
          <Image className='w-12 h-12 rounded-full border-2' src={img} alt={'User Profile'} width={100} height={100}/>
          <span className='ml-4 text-[#f5f5f7]'>{firstName} {lastName}</span>
        </span>
        <button><MyIcon/></button>
      </div> 
    </>
  )
} 
