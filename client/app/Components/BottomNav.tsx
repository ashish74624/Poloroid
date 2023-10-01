'use client'
import React,{useState} from 'react'
import HomeIcon from '../Icons/HomeIcon'
import Link from 'next/link'
import AddIcon from '../Icons/AddIcon'
import Menubtn from '../Icons/Menubtn'
import Image from 'next/image'
import CutIcon from '../Icons/CutIcon'
import convertToBase64 from '../lib/convertToBase64'
import FriendsIcon from '../Icons/FriendsIcon'
import { AnimatePresence,motion } from 'framer-motion'
import Sidebar from './Sidebar'
import toast , {Toaster}  from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/Components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/Components/ui/sheet"
import Sidebar2 from './Sidebar2'

let backendURL = process.env.BACKEND

export default function BottomNav({firstName,lastName,email,upload,people}:any) {
    const [visible,setVisible] = useState(false);
    const [side,setSide] = useState(false);
    const [file, setFile] = useState('');
    const [caption,setCaption] = useState('');
    const [isDiabled,setIsDiabled] = useState(false);

    const handleImageSelect = async(event:any) => {
        const base64 = await convertToBase64(event.target.files[0]);
        setFile(base64 as string);
        };


        const imageUpload = async()=>{
            toast.loading("Posting...");
            setIsDiabled(true);
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
                setIsDiabled(false);
                toast.success("Done");
              },100)
            }
            else{
              toast.dismiss();
              setTimeout(()=>{
                setIsDiabled(false);
                toast.error('Error while uploading Please try again later');
              },100)
              
            }
          
            }catch(err){
              toast.dismiss();
              setTimeout(()=>{
                setIsDiabled(false);
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
    <main className='fixed w-screen z-50 bottom-0 bg-[#F8F8F8] py-2 flex justify-center border-t border-gray-600'>
    <div className=' px-4  w-max rounded-full'>
        <div className='flex w-60 h-12 py-2  items-center justify-between'>
            <Link href={`/home/${email}`}>
                <span className=''><HomeIcon/></span>
                {/* <p className=' text-xs'>Home</p> */}
            </Link>
              <Dialog>
            <DialogTrigger>
            <span className="flex items-center justify-center bg-gray-900 text-white w-12 h-12 rounded-full focus:outline-2 focus:outline-[#58b8e8]">
                <svg className="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
            </span>
            </DialogTrigger>
            <DialogContent>
          {file?
          (<>
          <div className="relative mt-4">
              <button className="px-3 py-1 rounded-full transition hover:bg-black text-white bg-black/50 absolute top-2 right-4"
              onClick={()=>{setFile('')}}
              >X</button>
              <Image src={file} className="flex flex-col items-center justify-center w-full h-96 bg-[#1d1d1f] mx-auto"alt='Hello' width={100} height={100}/>
          </div>
          <input className="bg-white flex-grow pl-4 min-h-[65px] border border-black" name="caption" placeholder='Enter Caption' onChange={(e)=>{ setCaption(e.target.value)}} />
          </>)
          :
          (<>
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-96  cursor-pointer bg-[#1d1d1f] mx-auto mt-4">
              <div className=" flex flex-col justify-start items-center">
                  <svg className="h-10 w-10 mx-auto text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-50 font-semibold">Click to upload</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleImageSelect} />
          </label>
          <input className="bg-white flex-grow pl-4 min-h-[65px] border border-black" type="text" name="caption" id="" placeholder='Enter Caption' onChange={(e)=>{ setCaption(e.target.value)}} />
          </>)}
      <div className='w-full'>
        <button 
        disabled={isDiabled}
        className='bg-[#F8C732] h-10 w-24 text-xl rounded-lg text-gray-200 font-semibold flex items-center justify-center mx-auto '
        onClick={imageUpload}>
          Post 
        </button>
      </div>
            </DialogContent>
          </Dialog>
            
            <Sheet>
              <SheetTrigger>
              <span>
                <Menubtn/>
                {/* <p className=' text-xs'>Menu</p> */}
              </span>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    <Sidebar2 email={email}/>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
        </div>
    </div> 
    </main>
    </>
  )
}
