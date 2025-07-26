'use client'

import React, { FormEvent } from 'react'
import { Comfortaa } from 'next/font/google'
import { useState } from 'react'
import convertToBase64 from '../lib/convertToBase64'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import AuthContainer from '../Components/auth/AuthContainer'
import FormLabel from '../Components/auth/FormLabel'
import FormInput from '../Components/auth/FormInput'
import FormField from '../Components/auth/FormField'
import FormContainer from '../Components/auth/FormContainer'
import UserIcon from '../Icons/UserIcon'
import FormButton from '../Components/auth/FormButton'


const Comf = Comfortaa({
  subsets: ['cyrillic'],
  weight: '400'
})

let backendURL = process.env.BACKEND

export default function Register() {

  const [file, setFile] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [place, setPlace] = useState('')
  const [form, setForm] = useState(true);
  const [isDiabled, setIsDiabled] = useState(false);
  const router = useRouter();

  const handleImageSelect = async (event: any) => {
    const base64 = await convertToBase64(event.target.files[0]);
    setFile(base64 as string);
  };

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault()
    setIsDiabled(true)
    toast.loading('loading...');
    try {

      const res = await fetch(`${backendURL}/user/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          place,
          file
        })
      });


      const data = await res.json()
      console.log(data.status)
      if (data.status === "ok") {
        toast.dismiss();
        setIsDiabled(false)
        router.push('/login')
      }
      else if (data.status === 'error') {
        toast.dismiss();
        setIsDiabled(false)
        setTimeout(() => {
          toast.error(data.msg);
        }, 100)
      }
      else {

      }
    } catch (err) {
      toast.dismiss();
      setIsDiabled(false)
      setTimeout(() => {
        toast.error("Server not working at the moment")
      }, 100)

    }
  }

  const handleNextButtonClick = async () => {
    if (!firstName || !lastName || !email || !password) {
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setForm(false);
  }

  const handleBackButton = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPlace('')
    setForm(true);
  }

  return (

    <AuthContainer>
      <h3 className=' text-white text-2xl md:text-4xl lg:text-5xl '>Welcome to <span className={`${Comf.className}`}>poloroid</span> | Register</h3>
      <FormContainer>

        <form onSubmit={handleRegister}>
          {
            form ?
              <>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <FormField>
                    <FormInput type="text" name="first_name" id="first_name" onChange={(e) => { setFirstName(e.target.value) }} />
                    <FormLabel label='First name' htmlFor="floating_first_name" />
                  </FormField>
                  <FormField >
                    <FormInput type="text" name="floating_last_name" id="floating_last_name" onChange={(e) => { setLastName(e.target.value) }} />
                    <FormLabel label='Last name' htmlFor="floating_last_name" />
                  </FormField>
                </div>
                <FormField>
                  <FormInput type="email" name="floating_email" id="floating_email" onChange={(e) => { setEmail(e.target.value) }} />
                  <FormLabel label='Email address' htmlFor="floating_email" />
                </FormField>
                <FormField>
                  <FormInput type="password" name="floating_password" id="floating_password" onChange={(e) => { setPassword(e.target.value) }} />
                  <FormLabel label='Password' htmlFor="floating_password" />
                </FormField>
                <FormButton onClick={handleNextButtonClick}>
                  Next
                </FormButton>
              </>
              :
              <>
                <div>
                  <h2 className='w-full flex justify-center text-lg font-sans mb-4'>Please choose an User Profile</h2>
                  <div className='w-full items-center flex flex-col'>
                    {
                      file
                        ?
                        <>
                          <Image className=' w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full' src={file} alt='Hello' width={100} height={100} />
                          <button onClick={() => { setFile('') }} className='my-2 text-red-500 transition duration-200'>Profile Picture</button>
                        </>
                        :
                        <>
                          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full  cursor-pointer bg-gray-400/70">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <UserIcon />
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={handleImageSelect} />
                          </label>
                          <span className='my-2'>Profile Picture</span>
                        </>
                    }
                  </div>
                </div>
                <div className='w-full flex justify-between gap-24'>
                  <FormButton
                    disabled={isDiabled}
                    onClick={handleBackButton}>
                    Back
                  </FormButton>
                  <FormButton type="submit" >Submit</FormButton>
                </div>

              </>
          }
        </form>
        <p className='text-black text-xs mt-4'>Already have an account ?<Link href={'/login'}><span className='text-xs text-[#F8C732] hover:underline pl-1'>Login</span></Link> </p>
      </FormContainer>
    </AuthContainer>

  )
}
