'use client'

import React from 'react'
import Image from 'next/image'
import img from '@/public/img3.jpg'
import convertToBase64 from '../lib/convertToBase64'
import { useState } from 'react'


export default function Upload() {

    const [file, setFile] = useState('');

    const handleImageSelect = async(event:any) => {
        const base64 = await convertToBase64(event.target.files[0]);
        setFile(base64 as string);
        };


  return (
    <>
    <Image className='h-[20vw] w-[20vw] mb-3 rounded-xl mx-[5vw]' src={file || img} alt={'helli'} width={100} height={100} unoptimized={true}/>
    <div className='relative'>
      <input className='file:w-[30vw] file:h-10 file:rounded-full absolute opacity-0' type="file" name="file" id="" onChange={handleImageSelect} />
      <button className='text-white bg-purple-500 h-10 w-[30vw] rounded-full '>Choose File</button>
    </div>
    </>
  )
}
