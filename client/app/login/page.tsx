'use client'

import React, { FormEvent } from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Comfortaa } from 'next/font/google'
import toast , {Toaster}  from 'react-hot-toast'

const Comf = Comfortaa({
  subsets:['cyrillic'],
  weight:'400'
})

let backendURL = process.env.BACKEND


export default function Login() {

  const router = useRouter()
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isDiabled,setIsDiabled] = useState(false);


  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setIsDiabled(true);
    toast.loading('Logging in...'); 
    try{
      const response = await fetch(`${backendURL}/login`, {
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
        toast.dismiss();
        setIsDiabled(false);
        router.push(`/home/${data.user.email}`);
      }
      else if(data.status==='error'){
        toast.dismiss();
        setIsDiabled(false);
        setTimeout(()=>{
          toast.error(data.msg);
        },100)
      }
      else{
        
      }
    }
    catch(err){
      toast.dismiss();
      setIsDiabled(false);
        setTimeout(()=>{
          toast.error('Server not working at the moment')
        },100)
    }
  }  


  return (
    <>
     <main className='bg-[#58b8e8] h-screen w-screen flex flex-col pt-32 items-center space-y-8'>
      <h3 className={` ${Comf.className} text-white text-5xl`}>Login | Welcome Back</h3>
        {/* Form */}
      <section className='bg-white w-[350px] md:w-96 h-max py-8 rounded-xl px-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
        <form onSubmit={handleLogin}>
          <div className='relative z-0 w-full mb-6 group '>
            <input type='email' name='email' id='email' className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer' placeholder=' ' required
            onChange={(e)=>{setEmail(e.target.value)}}
            />
            <label htmlFor='floating_email' className='peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Email address</label>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <input type='password' name='password' id='password' className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer' placeholder=' ' required
            onChange={(e)=>{setPassword(e.target.value)}}
            />
            <label htmlFor='floating_password' className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Password</label>
          </div>
          <button disabled={isDiabled} type='submit' className='text-white bg-[#F8C732] hover:bg-yellow-500  focus:outline-none focus:ring-yellow-500 focus:ring-2 active:bg-white active:text-[#F8C732] font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Submit</button>
        </form>
          <p className={`text-black text-xs mt-4`}>Don&apos;t have an account yet ?<Link href={`/register`}><span className={`text-xs text-[#F8C732] hover:underline pl-1`}>Sign up</span></Link> </p>
      </section>
      <Toaster/>
    </main> 
    </>
  )
}
