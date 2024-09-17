'use client'

import React, { FormEvent } from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Comfortaa } from 'next/font/google'
import toast, { Toaster } from 'react-hot-toast'
import FormLabel from '../Components/FormLabel'
import FormInput from '../Components/FormInput'

const Comf = Comfortaa({
  subsets: ['cyrillic'],
  weight: '400'
})

let backendURL = process.env.BACKEND


export default function Login() {

  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDiabled, setIsDiabled] = useState(false);


  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setIsDiabled(true);
    toast.loading('Logging in...');
    try {
      const response = await fetch(`${backendURL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            email, password
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
      else if (data.status === 'error') {
        toast.dismiss();
        setIsDiabled(false);
        setTimeout(() => {
          toast.error(data.msg);
        }, 100)
      }
      else {

      }
    }
    catch (err) {
      toast.dismiss();
      setIsDiabled(false);
      setTimeout(() => {
        toast.error('Server not working at the moment')
      }, 100)
    }
  }


  return (
    <>
      <main className='bg-[#58b8e8] h-screen w-screen flex flex-col pt-32 items-center space-y-8 overflow-x-hidden overflow-y-scroll pb-32'>
        <h3 className={` ${Comf.className} text-white text-3xl md:text-5xl`}>Login | Welcome Back</h3>
        {/* Form */}
        <section className='bg-white w-[350px] md:w-96 h-max py-8 rounded-xl px-8 shadow-gray-900 '>
          <form onSubmit={handleLogin}>
            <div className='relative z-0 w-full mb-6 group '>
              <FormInput id='email' type='email' name='email' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }} />
              <FormLabel htmlFor='email' text='Email address' />
            </div>
            <div className='relative z-0 w-full mb-6 group'>
              <FormInput id='password' type='password' name='password'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }} />
              <FormLabel htmlFor='password' text='Password' />
            </div>
            <button disabled={isDiabled} type='submit' className='text-white w-full bg-[#F8C732] hover:bg-yellow-500  focus:outline-none focus:ring-yellow-500 focus:ring-2 active:bg-white active:text-[#F8C732] font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Submit</button>
          </form>
          <p className={`text-black text-xs mt-4`}>Don&apos;t have an account yet ?<Link href={`/register`}><span className={`text-xs text-[#F8C732] hover:underline pl-1`}>Sign up</span></Link> </p>
        </section>
        <Toaster />
      </main>
    </>
  )
}
