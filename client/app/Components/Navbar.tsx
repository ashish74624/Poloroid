'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Comfortaa } from 'next/font/google'
import CutIcon from './CutIcon'
import convertToBase64 from '../lib/convertToBase64'
import { StaticImageData } from 'next/image'
import { AnimatePresence,motion } from 'framer-motion'
import toast , {Toaster}  from 'react-hot-toast'
import Image from 'next/image'


const Comf = Comfortaa({
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

let backendURL = process.env.BACKEND

export default function Navbar({firstName,lastName,email,userImg,navData}:NavbarProps) {
  const [visible,setVisible] = useState(false);
  const [file, setFile] = useState('');
  const [caption,setCaption] = useState('');
  const [logoutbtn,setLogOutBtn] = useState(false);
    

    const handleImageSelect = async(event:any) => {
        const base64 = await convertToBase64(event.target.files[0]);
        setFile(base64 as string);
        };

      const imageUpload = async()=>{
        toast.loading("Posting...");
        try{
          const res = await fetch(`${backendURL}/upload`,{
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
          toast.dismiss();
          setCaption('')
          setFile('')
          setTimeout(()=>{
            toast.success("Done");
          },100)
        }
        else{
          toast.dismiss();
          setTimeout(()=>{
            toast.error('Error while uploading Please try again later');
          },100)
          
        }
      
        }catch(err){
          toast.dismiss();
          setTimeout(()=>{
            toast.error("Error Posting Image");
          },100)
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
      <div className={`w-[80vw] h-[7vh] lg:h-[9vh]  flex ${navData ? "justify-between":'justify-center'}  mx-auto items-center`}>
        
          <span className={`${Comf.className} text-2xl  lg:text-3xl  bg-clip-text text-[#58b8e8] `}>
          <Link className=' focus:outline-none' href={`/home/${email}`}>
            polaroid
          </Link>  
            </span>
        
        {
          navData?
          (
          <>
          <span className='flex'> 
          <span className='w-[86px] relative'>
            <button 
            onClick={()=>{setLogOutBtn(!logoutbtn)}}
            className='w-max h-max pl-6 focus:outline-none'>     
              <Image className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2  border-[#F8C732] p-1 mr-3" src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1687762741/${userImg}`} alt ={"Helo"} height={100} width={100}/>
            </button>
            {
              logoutbtn &&(
                  <div 
                    className={'bg-transparent w-24 h-20 absolute'}>
                    <Link className=' focus:outline-none' href={'/'}>
                      <button className='bg-red-500 w-24 flex justify-center text-white text-lg py-2 rounded-lg mt-[0.5rem] focus:outline-none focus:outline-2 focus:outline-[#F8C732] active:bg-white active:text-red-500 active:outline-2 active:outline-[#F8C732]'>
                        Log Out
                      </button>
                    </Link>
                  </div>
              )
            }
            
          </span>
          <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: '0px 0px 8px rgb(0,0,255)',
            textShadow: '0px 0px 8px rgb(0,0,255)'
          }}
          onClick={()=>{setVisible(!visible)}}
          className="md:flex items-center hidden justify-center bg-[#F8C732] text-white font-bold w-10 h-10 lg:w-12 lg:h-12 rounded-full focus:outline-2 focus:outline-[#58b8e8]">
            <svg className="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
    </motion.button>
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
      <Toaster/>
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
    onClick={()=>{setVisible(!visible); toast.dismiss();}}
    ><CutIcon/></button>
  </motion.section>
  </AnimatePresence>
        </>
      )}
        
    </>
  )
}
