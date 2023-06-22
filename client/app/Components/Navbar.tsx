'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Comfortaa } from 'next/font/google'
import MyIcon from './MyIcon'
import convertToBase64 from '../lib/convertToBase64'
import { StaticImageData } from 'next/image'

const Com = Comfortaa({
  subsets:['cyrillic'],
  weight:'400'
})

interface NavbarProps {
  firstName: string;
  lastName: string;
  email: string;
  userImg: string | StaticImageData ;
}

export default function Navbar({firstName,lastName,email,userImg,}:NavbarProps) {
  const [visible,setVisible] = useState('hidden');
  const [file, setFile] = useState('');
    const [caption,setCaption] = useState('');
    const [text, setText] = useState(false);

    

    const handleImageSelect = async(event:any) => {
        const base64 = await convertToBase64(event.target.files[0]);
        setFile(base64 as string);
        };

        const postData= async()=>{
            const res = await fetch('http://localhost:3001/post',{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName:lastName, 
                    email : email,
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
    <nav className=' border-b border-gray-600 fixed top-0 z-20 bg-[#F8F8F8] w-screen'>
      <div className='w-[80vw] h-16  flex justify-between mx-auto '>
        <span className={`${Com.className}  text-3xl  bg-clip-text text-[#71B1D1] pt-2`}>polaroid</span>
        <span className=' flex '>
          <Link href={'/dashboard'}>
          <Image className="w-12 h-12 rounded-full border-2 mt-2 border-[#F8C732] p-1 mr-3" src={userImg} alt ={"Helo"} width={100} height={100}/>
          </Link>
          <button onClick={()=>{setVisible('')}}>
            <MyIcon/>
          </button>
        </span>
      </div>
      </nav>
      <div className={`${visible}`}>
        <section className={`mt-0 fixed top-0 z-30 bg-slate-900/40 h-screen w-screen flex flex-col justify-center items-center`}>
        
            {file?
            (<>
             <div className='relative w-[22vw] h-[58vh] px-6 pt-5 flex flex-col items-center bg-[#F8F8F8]'>
                <Image className='w-[297px] h-[347px]' src={file} alt='Hello' width={100} height={100} />
                <div className="">
                <input className='w-[22vw] h-16 px-4' type="text" name="caption" id="" placeholder='Enter Caption' onChange={(e)=>{ setCaption(e.target.value)}} />
                <button className=' transition duration-200 ease-in-out absolute text-white top-8 right-9 rounded-full hover:bg-black/30 px-4 py-2' onClick={()=>{setFile('')}}>X</button>
                </div>
            </div>
            </>)
            :
            (<>
            <div className='w-[22vw] h-[60vh] px-5 pt-5 flex flex-col items-center bg-[#F8F8F8]'>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-[297px] h-[347px]  cursor-pointer bg-[#1d1d1f]">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-50 "><span className="font-semibold">Click to upload</span></p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleImageSelect} />
            </label>
            <div className="">
                <input className='w-[21.9vw] h-16 px-4' type="text" name="caption" id="" placeholder='Enter Caption' onChange={(e)=>{ setCaption(e.target.value)}} />
            </div>
            </div>
            </>)}

        <button className='bg-[#F8C732] mt-10 px-6 py-1 text-xl rounded-full text-[#71B1D1] font-semibold'
        onClick={postData}
        >Post</button>
        <button className='fixed top-[0.5rem] right-[138px] rotate-45'
        onClick={()=>{setVisible('hidden')}}
        ><MyIcon/></button>
      </section>
      </div> 
    </>
  )
}
