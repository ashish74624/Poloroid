'use client'

import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import convertToBase64 from '../lib/convertToBase64'
import img from '@/public/img3.jpg'
import { headers } from 'next/dist/client/components/headers'

export default function Post({userImg,userEmail}:any) {

    const [file, setFile] = useState('');
    const [caption,setCaption] = useState('');
    const [text, setText] = useState(false)

    const handleImageSelect = async(event:any) => {
        const base64 = await convertToBase64(event.target.files[0]);
        setFile(base64 as string);
        };

    const postData= async()=>{
        const res = await fetch('http://localhost:3001/posts',{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email : userEmail,
                caption,
                file
            })
        })

        const data = await res.json()
        if(data.status === 'ok'){
            // alert("Post Success")
            setCaption('')
            setFile('')
            
        }

    }

  return (
    <>
      <div className=' h-max mt-2 w-[50vw] bg-gray-300 rounded-md'>
      <Image className="w-12 h-12 rounded-full ml-10 mt-5  p-1 inline" src={userImg} alt ={"Helo"} width={100} height={100}/>
        <input className='h-10 w-[40vw] rounded-full float-right m-6 px-4 shadow' type="text" placeholder="What's on your mind Today?" onChange={(e)=>{ setCaption(e.target.value)}} />
        <p className='mx-[10vw] mb-3'>
        <Image className='h-[20vw] w-[20vw] mb-3 rounded-xl mx-[5vw]' src={file || img} alt={'helli'} width={100} height={100} unoptimized={true} />
        <div className='relative'>
      <input className='file:w-[20vw] file:h-10 file:rounded-full absolute opacity-0 ' type="file" name="file" id="" onChange={handleImageSelect} />
      <button className='text-white bg-purple-500 h-10 w-[20vw] rounded-full '>Choose File</button>
      <button className='bg-pink-500 h-10 rounded-full w-[9vw] ml-3 text-white relative z-10'
      onClick={()=>{setFile('')}}
      >Remove File</button>
    </div>
        </p>
        <button className='bg-purple-700 w-[40vw] mx-[5vw] mb-3 h-10 rounded-full text-2xl text-white'
        onClick={()=>{postData()}}
        >post</button>
      </div>
    </>
  )
}
