'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Comfortaa } from 'next/font/google'
import CutIcon from './CutIcon'
import convertToBase64 from '../lib/convertToBase64'
import { StaticImageData } from 'next/image'
import { AnimatePresence,motion } from 'framer-motion'


const Com = Comfortaa({
  subsets:['cyrillic'],
  weight:'400'
})

interface NavbarProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  userImg?: string | StaticImageData;
  navData :boolean;
}

export default function Navbar({firstName,lastName,email,userImg,navData}:NavbarProps) {
  const [visible,setVisible] = useState(false);
  const [file, setFile] = useState('');
    const [caption,setCaption] = useState('');

    

    const handleImageSelect = async(event:any) => {
        const base64 = await convertToBase64(event.target.files[0]);
        setFile(base64 as string);
        };

      const imageUpload = async()=>{
        const res = await fetch(`http://localhost:3001/upload`,{
          method:'POST',
          headers:{
              "Content-Type":"application/json"
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName:lastName, 
            email : email,
            caption,
            image:file,
          })
        }
        )
        const data = await res.json();
        if(data.status === 'ok'){
          // alert("Post Success")
          setCaption('')
          setFile('')
          
      }
      }

      const backdrpV = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
        },
      }

    

  return (
    <>
    <nav className=' border-b border-gray-600 bg-[#F8F8F8] w-screen'>
      <div className={`w-[80vw] h-[8vh] lg:h-[9vh]  flex ${navData ? "justify-between":'justify-center'}  mx-auto`}>
        
          <span className={`${Com.className} text-2xl  lg:text-3xl  bg-clip-text text-[#58b8e8] mt-3`}>
          <Link href={`/home/${email}`}>
            polaroid
          </Link>  
            </span>
        
        {
          navData?
          (
          <>
          <span className=' flex '>
          <Link href={'/dashboard'}>
          <img className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 mt-2 border-[#F8C732] p-1 mr-3" src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1687762741/${userImg}`} alt ={"Helo"}/>
          </Link>
          <button className='hidden md:block w-10 h-10 lg:w-12 lg:h-12 text-white mt-2 rounded-full bg-[#F8C732]' onClick={()=>{setVisible(!visible)}}>
            Post
          </button>
        </span>
          </>
          )
          :
          (
          <>
          </>
          )
        }
        
      </div>
      </nav>
      { visible &&(
        <>
        <AnimatePresence>
          <motion.section
          variants={backdrpV}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={`mt-0 z-50 fixed top-0 bg-slate-900/40 h-screen w-screen flex flex-col justify-center items-center`}>
        
        {file?
        (<>
         <div className="bg-white w-[30vw] h-[50vh] lg:w-[22vw] lg:h-[60vh] flex flex-col">
        <div className="relative">
            <button className="px-3 py-1 rounded-full transition hover:bg-black text-white bg-black/50 absolute top-8 right-8"
            onClick={()=>{setFile('')}}
            >X</button>
            <Image src={file} className="flex flex-col items-center justify-center  w-[26vw] h-[39vh] lg:w-[19vw] mt-[3vh] lg:h-[48vh]  cursor-pointer bg-[#1d1d1f] overflow-hidden mx-auto  "alt='Hello' width={100} height={100}/>
        </div>
        <input className="bg-white flex-grow pl-4" type="text"  name="caption" placeholder='Enter Caption' onChange={(e)=>{ setCaption(e.target.value)}} />
    </div>
        </>)
        :
        (<>
        <div className="bg-white w-[30vw] h-[50vh] lg:w-[22vw] lg:h-[60vh] flex flex-col">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-[26vw] h-[39vh] lg:w-[19vw] mt-[3vh] lg:h-[48vh]  cursor-pointer bg-[#1d1d1f] mx-auto">
            <div className=" flex flex-col justify-start items-center">
                <svg className="h-10 w-10 mx-auto text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-50 font-semibold">Click to upload</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleImageSelect} />
        </label>
        <input className="bg-white flex-grow pl-4" type="text" name="caption" id="" placeholder='Enter Caption' onChange={(e)=>{ setCaption(e.target.value)}} />
    </div>
        </>)}

    <button className='bg-[#F8C732] mt-10 px-6 py-1 text-xl rounded-full text-[#71B1D1] font-semibold'
    onClick={imageUpload}
    >Post</button>
    <button className='fixed top-[0.5rem] right-4 rotate-45'
    onClick={()=>{setVisible(!visible)}}
    ><CutIcon/></button>
  </motion.section>
  </AnimatePresence>
        </>
      )}
        
    </>
  )
}
