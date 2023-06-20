'use client'

import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import convertToBase64 from '../lib/convertToBase64';

// import DropZone from './DropZone';

export default function Form() {

    const router = useRouter()
    const [login,setLogin] = useState(false);
    const [file, setFile] = useState('');
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const handleImageSelect = async(event:any) => {
        const base64 = await convertToBase64(event.target.files[0]);
        setFile(base64 as string);
        };

    const handleRegister=async(event: FormEvent)=>{
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
            setLogin(true)
        }
        }catch(err){
            // alert(err.message)
        }
      }

      async function handleLogin(formData: FormData) {
        const email = formData.get('email');
        const password = formData.get('password');
      
        const body = {
          email: email,
          password: password
        };
      
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
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
    {
        login?
        (<>
            <form action={handleLogin} >
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 ">Email</label>
                    <input type="email" id="email" name="email" className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-80 h-10 placeholder:text-lg px-2" placeholder="name@email.com" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 ">Password</label>
                    <input type="password" id="password" name="password" className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" placeholder='********' required/>
                </div>
                <div className='flex w-full justify-between'>
                    <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                    <button className='text-purple-400 font-semibold text-lg hover:underline'
                     onClick={()=>{setLogin(false)}} 
                     >Register
                    </button>
                </div>
            </form>
        </>):
        (
        <>
            <form onSubmit={handleRegister}>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="firstName" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                        onChange={(e)=>{setFirstName(e.target.value)}}
                        placeholder=" " required />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="lastName" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-purple-600 peer" 
                        onChange={(e)=>{setLastName(e.target.value)}}
                        placeholder=" " required />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                    onChange={(e)=>{setEmail(e.target.value)}} placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer" 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <label className="block mb-2 text-base  font-medium text-gray-500" htmlFor="file_input">Upload Profile Picture</label>
                <input name ='profileImage' className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer  bg-[#efd3cd] focus:outline-none" id="file_input" type="file" onChange={handleImageSelect}
                accept="image/jpeg, image/png , image/jpg"/>
                {/* <DropZone/> */}
                <div className='flex w-full justify-between pt-5'>
                    <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                    
                    <button className='text-purple-400 font-semibold text-lg hover:underline'
                    onClick={()=>{setLogin(true)}}
                    >Login</button>
                
                </div>
            </form>
        </>)
    }
       
    </>
  )
}
