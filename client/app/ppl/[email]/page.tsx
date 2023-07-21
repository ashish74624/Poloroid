import React from 'react'
import RightSidebar from '@/app/Components/RightSidebar';
import Navbar from '@/app/Components/Navbar';
import Link from 'next/link';
import LeftArrow from '@/app/Icons/LeftArrow';
import { Metadata } from 'next';
import UserCard from '@/app/Components/UserCard';


export const metadata: Metadata={
  title:'Poloroid | People you may know',
}

type Params={
    params:{
      email:string
    }
}

let backendURL = process.env.BACKEND

export default async function ppl({params:{email}}:Params) {
    const res = await fetch(`${backendURL}/getFriendSuggestions/${email}`,{cache:'no-store'});
    const data = await res.json();
  return (
    <>
    <Navbar navData={false} email={email}/>
      <section className='w-screen flex flex-col h-screen items-center bg-[#F8F8F8] overflow-x-hidden overflow-y-scroll'>
      <span className='text-gray-800 mx-auto h-14 bg-white rounded-full font-mono w-[95vw] md:w-[80vw] lg:w-[60vw] flex justify-between px-6 py-2 items-center border border-gray-300 mt-2 shadow '>
          <h1 className='text-lg md:text-xl'>People you may know</h1>
          <Link className=' focus:outline-none ' href={`/home/${email}`}>
            <button className='bg-gray-700 transition-all duration-200 hover:bg-slate-400 flex h-max items-center text-white text-lg rounded-full pl-3 pr-4 py-2 focus:outline-8 focus:outline-slate-400 active:outline-8 active:bg-white active:outline-black active:text-black'>
              <LeftArrow/> Home
            </button>
          </Link>
        </span>
        <section className='overflow-y-scroll bg-[#F8F8F8] flex flex-col items-center space-y-2 pt-4 right-0 w-screen'>        
      {data.map((data:any)=>(
            <>
            <UserCard profileImage={data.profileImage} id={data._id} emailOfUser={email} firstName={data.firstName} lastName={data.lastName} />
            </>
          ))}
          </section>
      </section>
    </>
  )
}
