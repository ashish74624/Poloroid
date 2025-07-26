'use client'

import React, { FormEvent } from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Comfortaa } from 'next/font/google'
import toast, { Toaster } from 'react-hot-toast'
import FormLabel from '../Components/auth/FormLabel'
import FormInput from '../Components/auth/FormInput'
import AuthContainer from '../Components/auth/AuthContainer'
import FormField from '../Components/auth/FormField'
import FormContainer from '../Components/auth/FormContainer'
import FormButton from '../Components/auth/FormButton'

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

      if (data.user) {
        toast.dismiss();
        setIsDiabled(false);
        localStorage.setItem("email", data.user.email);
        router.push(`/home/${decodeURIComponent(data.user.email)}`);
      }
      else {
        toast.dismiss();
        setIsDiabled(false);
        setTimeout(() => {
          toast.error(data.msg);
        }, 100)
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
    <AuthContainer>
      <h3 className={` ${Comf.className} text-white text-3xl md:text-5xl`}>Login | Welcome Back</h3>
      <FormContainer>
        <form onSubmit={handleLogin}>
          <FormField>
            <FormInput id='email' type='email' name='email' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }} />
            <FormLabel htmlFor='email' label='Email address' />
          </FormField>
          <FormField>
            <FormInput id='password' type='password' name='password'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }} />
            <FormLabel htmlFor='password' label='Password' />
          </FormField>
          <FormButton disabled={isDiabled} type='submit'>Submit</FormButton>
        </form>
        <p className={`text-black text-xs mt-4`}>Don&apos;t have an account yet ?<Link href={`/register`}><span className={`text-xs text-[#F8C732] hover:underline pl-1`}>Sign up</span></Link> </p>
      </FormContainer>
    </AuthContainer >
  )
}
