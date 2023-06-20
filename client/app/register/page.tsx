'use client'

import React, { FormEvent } from 'react'
import { Comfortaa } from 'next/font/google'
import { useState } from 'react'
import convertToBase64 from '../lib/convertToBase64'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Comf = Comfortaa({
    subsets:['cyrillic'],
    weight:'400'
  })

export default function Register() {
  
  const [file, setFile] = useState('');
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const router = useRouter();

  const handleImageSelect = async(event:any) => {
    const base64 = await convertToBase64(event.target.files[0]);
    setFile(base64 as string);
    };

    const handleRegister=async(event : FormEvent)=>{
      event.preventDefault()
      
      try{
      
          const res = await fetch('http://localhost:3001/register',{
          method:"POST",
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify({
              firstName,
              lastName,
              email,
              password,
              file
          })
      })
      const data = await res.json()
      console.log(data.status)
      if(data.status==="ok"){
        router.push('/login')
      }
      }catch(err){
          // alert(err.message)
      }
    }

  return (
    <>
      <main className='bg-[#71B1D1] h-screen w-screen flex flex-col pt-7 items-center space-y-5'>
      <h3 className='text-white text-5xl'>Welcome to <span className={`${Comf.className}`}>polaroid</span></h3>
      <div className='bg-[#f5f5f7] w-[25vw] h-max py-8 rounded-xl px-8 shadow-xl shadow-gray-600'>
        
<form onSubmit={handleRegister}>
  <div>
  {file?
            (<>
            <div className='w-full items-center flex flex-col'>
                <Image className='w-36 h-36 rounded-full' src={file} alt='Hello' width={100} height={100} />
                <button onClick={()=>{setFile('')}} className='my-2 hover:text-red-500 transition duration-200'>Profile Picture</button>
            </div>
            </>)
            :
            (<>
            <div className='w-full items-center flex flex-col '>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-36 h-36 rounded-full  cursor-pointer bg-gray-400/70">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg width="6rem" height="6rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9ZM15.8243 13.6235C17.1533 12.523 18 10.8604 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 10.8604 6.84668 12.523 8.17572 13.6235C4.98421 14.7459 3 17.2474 3 20C3 20.5523 3.44772 21 4 21C4.55228 21 5 20.5523 5 20C5 17.7306 7.3553 15 12 15C16.6447 15 19 17.7306 19 20C19 20.5523 19.4477 21 20 21C20.5523 21 21 20.5523 21 20C21 17.2474 19.0158 14.7459 15.8243 13.6235Z" stroke="#000000" strokeWidth="0.001" />
              </svg>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleImageSelect} />
            </label>
            <span className='my-2'>Profile Picture</span>
            </div>
            </>)}
  </div>
<div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-6 group">
        <input type="text" name="first_name" id="first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer" placeholder=" " required
        onChange={(e)=>{setFirstName(e.target.value)}}
        />
        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
    </div>
    <div className="relative z-0 w-full mb-6 group">
        <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer" placeholder=" " required
        onChange={(e)=>{setLastName(e.target.value)}}
        />
        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
    </div>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer" placeholder=" " required
      onChange={(e)=>{setEmail(e.target.value)}}
      />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer" placeholder=" " required
      onChange={(e)=>{setPassword(e.target.value)}}
      />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer" placeholder=" " required />
      <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  </div>
  
  <button type="submit" className="text-white bg-[#F8C732] hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
  <p className='text-black text-xs mt-4'>Already have an account ?<Link href={'/login'}><span className='text-xs text-[#F8C732] hover:underline pl-1'>Login</span></Link> </p>
</form>

      </div>
      </main>
    </>
  )
}
