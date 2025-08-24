'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import convertToBase64 from '../lib/convertToBase64'
import { StaticImageData } from 'next/image'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/Components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/Components/ui/dialog"
import { cloud_name, placeholderImage } from '../libs/configs'


interface NavbarProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  userImg?: string | StaticImageData;
  navData: boolean;
}

let backendURL = process.env.BACKEND

export default function Navbar({ firstName, lastName, email, userImg, navData }: NavbarProps) {
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState('');
  const [caption, setCaption] = useState('');
  const [logoutbtn, setLogOutBtn] = useState(false);
  const [isDiabled, setIsDiabled] = useState(false);


  const handleImageSelect = async (event: any) => {
    const base64 = await convertToBase64(event.target.files[0]);
    setFile(base64 as string);
  };

  const imageUpload = async () => {
    toast.loading("Posting...");
    setIsDiabled(true);
    try {
      const res = await fetch(`${backendURL}post/upload/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          caption,
          image: file,
        })
      }
      )
      const data = await res.json();
      if (data.status === 'ok') {
        toast.dismiss();
        setCaption('')
        setFile('')
        setTimeout(() => {
          toast.success("Done");
          setIsDiabled(false);
        }, 100)
      }
      else {
        toast.dismiss();
        setTimeout(() => {
          toast.error('Error while uploading Please try again later');
          setIsDiabled(false);
        }, 100)

      }

    } catch (err) {
      toast.dismiss();
      setTimeout(() => {
        toast.error("Error Posting Image");
        setIsDiabled(false);
      }, 100)
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
        <div className={`w-[80vw] min-h-[60px] h-[7vh] lg:h-[9vh]  flex ${navData ? "justify-between" : 'justify-center'}  mx-auto items-center`}>

          <span className={"text-2xl lg:text-3xl  bg-clip-text text-[#58b8e8] "}>
            <Link className=' focus:outline-none' href={`/home/${email}`}>
              poloroid
            </Link>
          </span>

          {
            navData ?
              (
                <>
                  <span className='flex'>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='focus:outline-none'>
                        <Image className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2  border-[#F8C732] p-1 mr-3" src={cloud_name ? `https://res.cloudinary.com/${cloud_name}/image/upload/v1687762741/${userImg}` : placeholderImage} alt={"User_profile"} height={100} width={100} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>{firstName} {lastName}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={'/'}>
                          <DropdownMenuItem className='text-red-500'>
                            Log Out
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog>
                      <DialogTrigger>
                        <motion.span
                          whileHover={{
                            scale: 1.1,
                            boxShadow: '0px 0px 8px rgb(0,0,255)',
                            textShadow: '0px 0px 8px rgb(0,0,255)'
                          }}
                          className="md:flex items-center hidden justify-center bg-[#F8C732] text-white font-bold w-10 h-10 lg:w-12 lg:h-12 rounded-full focus:outline-2 focus:outline-[#58b8e8]">
                          <svg className="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                          </svg>
                        </motion.span>
                      </DialogTrigger>
                      <DialogContent>
                        {file ?
                          (<>
                            <div className="relative mt-4">
                              <button className="px-3 py-1 rounded-full transition hover:bg-black text-white bg-black/50 absolute top-2 right-4"
                                onClick={() => { setFile('') }}
                              >X</button>
                              <Image src={file} className="flex flex-col items-center justify-center w-full h-96 bg-[#1d1d1f] mx-auto" alt='Hello' width={100} height={100} />
                            </div>
                            <input className="bg-white flex-grow pl-4 min-h-[65px] border border-black" name="caption" placeholder='Enter Caption' onChange={(e) => { setCaption(e.target.value) }} />
                          </>)
                          :
                          (<>
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-96  cursor-pointer bg-[#1d1d1f] mx-auto mt-4">
                              <div className=" flex flex-col justify-start items-center">
                                <svg className="h-10 w-10 mx-auto text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-50 font-semibold">Click to upload</p>
                              </div>
                              <input id="dropzone-file" type="file" className="hidden" onChange={handleImageSelect} />
                            </label>
                            <input className="bg-white flex-grow pl-4 min-h-[65px] border border-black" type="text" name="caption" id="" placeholder='Enter Caption' onChange={(e) => { setCaption(e.target.value) }} />
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
    </>
  )
}
