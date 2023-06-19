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
       <div className='relative w-[22vw] h-[58vh] px-6 pt-5 flex flex-col items-center bg-[#fffff2] border-2 border-[#1d1d1f]'>
                <Image className='w-[297px] h-[347px]' src={image} alt='Hello' width={100} height={100} />
                <div className="">
                <p className={` ${ks.className} w-[21.8vw] h-16 px-4 bg-[#f3f3ed] flex justify-center items-center`}>{caption}</p>
                </div>
            </div>
    </>
  )
}
