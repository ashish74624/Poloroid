import React from 'react'
import RightSidebar from '@/app/Components/RightSidebar';
import Navbar from '@/app/Components/Navbar';
import Link from 'next/link';
import LeftArrow from '@/app/Icons/LeftArrow';

type Params={
    params:{
      email:string
    }
}

let backendURL = process.env.BACKEND || 'http://localhost:3001'

export default async function ppl({params:{email}}:Params) {
    const res = await fetch(`${backendURL}/getFriendSuggestions/${email}`,{cache:'no-store'});
    const data = await res.json();
  return (
    <>
    <Navbar navData={false} email={email}/>
      <section className='w-screen flex flex-col h-screen items-center bg-[#F8F8F8] overflow-x-hidden overflow-y-scroll'>
      <span className='text-gray-800 mx-auto h-14 bg-white rounded-full font-mono w-[95vw] md:w-[80vw] lg:w-[60vw] flex justify-between px-6 items-center border border-gray-300 mt-2 shadow '>
          <h1 className='text-lg md:text-xl'>People you may know</h1>
          <Link className=' focus:outline-none ' href={`/home/${email}`}>
            <button className='bg-gray-700 transition-all duration-200 hover:bg-slate-400 flex h-max items-center text-white text-lg rounded-full pl-3 pr-4 py-2 focus:outline-8 focus:outline-slate-400 active:outline-8 active:bg-white active:outline-black active:text-black'>
              <LeftArrow/> Home
            </button>
          </Link>
        </span>
      {data.map((data:any)=>(
            <>
            <RightSidebar profileImage={data.profileImage} id={data._id} email={email} firstName={data.firstName} lastName={data.lastName} />
            </>
          ))}
      </section>
    </>
  )
}
