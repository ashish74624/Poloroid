'use client'
import React,{useState} from 'react'
import HomeIcon from './HomeIcon'
import Link from 'next/link'
import AddIcon from './AddIcon'
import Menubtn from './Menubtn'
import Image from 'next/image'
import CutIcon from './CutIcon'
import convertToBase64 from '../lib/convertToBase64'
import FriendsIcon from '../Icons/FriendsIcon'
import { AnimatePresence,motion } from 'framer-motion'
import Sidebar from './Sidebar'
import toast , {Toaster}  from 'react-hot-toast'

let backendURL = process.env.BACKEND || 'http://localhost:3001'

export default function BottomNav({firstName,lastName,email}:any) {
    const [visible,setVisible] = useState(false);
    const [side,setSide] = useState(false);
    const [file, setFile] = useState('');
    const [caption,setCaption] = useState('');

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
    <main className='fixed w-screen z-40 bottom-0'>
    <div className='  bg-yellow-200  mx-auto px-4  w-max rounded-full'>
        <div className='flex w-60 h-12 py-2  items-center justify-between'>
            <Link href={`/home/${email}`}>
            <span className=''><HomeIcon/></span>
            </Link>
            <button onClick={()=>{setVisible(!visible)}}>
                <AddIcon/>
            </button>
            <button onClick={()=>{setSide(!side)}}>
                <Menubtn/>
            </button>
            <Link href={`/ppl/${email}`}>
            <button>
                <FriendsIcon/>
            </button>
            </Link>
        </div>
    </div> 
    {visible && (
        <>
        <AnimatePresence>
           <motion.div
            variants={backdrpV}
            initial="hidden"
            animate="visible"
            exit="hidden"
           >
        <section className={`mt-0 z-50 fixed top-0 bg-slate-900/40 h-screen w-screen flex flex-col justify-center items-center`}>
        
        {file?
            (<>
             <div className="bg-white w-[40vh] h-[55vh] md:w-[30vw] md:h-[50vh] lg:w-[22vw] lg:h-[60vh] flex flex-col">
            <div className="relative">
                <button className="px-3 py-1 rounded-full transition hover:bg-black text-white bg-black/50 absolute top-8 right-8"
                onClick={()=>{setFile('')}}
                >X</button>
                <Image src={file} className="flex flex-col items-center justify-center  w-[35vh]   h-[43vh] md:w-[26vw] md:h-[39vh] lg:w-[19vw] mt-[3vh] lg:h-[48vh]  cursor-pointer bg-[#1d1d1f] overflow-hidden mx-auto  "alt='Hello' width={100} height={100}/>
            </div>
            <input className="bg-white flex-grow pl-4" type="text"  name="caption" placeholder='Enter Caption' onChange={(e)=>{ setCaption(e.target.value)}} />
        </div>
            </>)
            :
            (<>
            <div className="bg-white w-[40vh] h-[55vh] md:w-[30vw] md:h-[50vh] lg:w-[22vw] lg:h-[60vh] flex flex-col">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-[35vh]   h-[43vh] md:w-[26vw] md:h-[39vh] lg:w-[19vw] mt-[3vh] lg:h-[48vh]  cursor-pointer bg-[#1d1d1f] mx-auto">
                <div className=" flex flex-col justify-start items-center">
                    <svg className="h-10 w-10 mx-auto text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
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
      </section>
      </motion.div> 
      </AnimatePresence>
        </>
    ) }

    {side &&(
        <>
        <AnimatePresence>
            <motion.section
            variants={backdrpV}
            initial="hidden"
            animate="visible"
            exit="hidden" className='bg-black/50 h-screen w-screen fixed rounded z-50 top-0 flex justify-center items-center'>
                <div className='bg-[#F8F8F8] w-52 h-max px-2 pb-40 rounded-lg'>
                    <Sidebar email={email}/>
                </div>
                <button className='fixed top-[0.5rem] right-4 rotate-45'
                onClick={()=>{setSide(!side)}}>
                    <CutIcon/>
                </button>
            </motion.section>
        </AnimatePresence>    
        </>
    )}
    </main>
  )
}
