import React from 'react'
import Image from 'next/image'
import { Kaushan_Script } from 'next/font/google';

const ks = Kaushan_Script({
    subsets:['latin'],
    weight:'400'
})

interface PostProps{
    id?:string;
    firstName:string;
    lastName:string;
    image: string;
    caption: string;
}

export default function Post({id,firstName,lastName,image,caption}:PostProps) {
  return (
    <>
    <div className='bg-[#71B1D1] w-max h-max px-6 pb-6 pt-3 rounded'>
      <p className='pl-1 mb-1 hover:underline cursor-pointer w-max'>{firstName} {lastName}</p>
       <div className='relative w-[22vw] h-[58vh] px-6 pt-5 flex flex-col items-center bg-white border border-[#1d1d1f] shadow-xl'>
                <Image className='w-[297px] h-[347px]' src={image} alt='Hello' width={100} height={100} />
                <div className="">
                <p className={` ${ks.className} w-[21.8vw] h-16 px-4 bg-white flex justify-center items-center`}>{caption}</p>
                </div>
            </div>
    </div>
    </>
  )
}
