'use client'

import React, { FormEvent } from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {

  const router = useRouter()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')


  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          email,password
        }
      )
    });
  
    const data = await response.json();
    console.log(data.status);
  
    if (data.user) {
      localStorage.setItem('token', data.user);
      router.push('/home');
    } else {
      console.log('Error');
    }
  }


  return (
    <>
     <main className='bg-[#71B1D1] h-screen w-screen flex flex-col pt-32 items-center space-y-8'>
      <h3 className='text-white text-5xl'>Welcome Back</h3>
        {/* Form */}
        <div className='bg-[#f5f5f7] w-[25vw] h-max py-8 rounded-xl px-8 shadow-xl shadow-gray-600'>
          
<form onSubmit={handleLogin}>
  <div className="relative z-0 w-full mb-6 group ">
      <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer" placeholder=" " required
      onChange={(e)=>{setEmail(e.target.value)}}
      />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer" placeholder=" " required
      onChange={(e)=>{setPassword(e.target.value)}}
      />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <button type="submit" className="text-white bg-[#F8C732] hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
  <p className='text-black text-xs mt-4'>Don't have an account yet ?<Link href={'/register'}><span className='text-xs text-[#F8C732] hover:underline pl-1'>Sign up</span></Link> </p>
</form>

        </div>
    </main> 
    </>
  )
}
