import React, { Suspense } from 'react'
import Navbar from '@/app/Components/Navbar';
import userDefaultImage from '@/public/userDefaultImage.webp'
import NotfCard from '@/app/Components/NotfCard';
import NotfSkel from '@/app/Components/NotfSkel';
import Link from 'next/link';
import LeftArrow from '@/app/Icons/LeftArrow';

type Params={
  params:{
    email:string
  }
}

let backendURL = process.env.BACKEND || 'http://localhost:3001'

export default async function Notifications({params:{email}}:Params) {
    
  const res = await fetch(`${backendURL}/notifications/${email}`,{cache:'no-store'});
  const data = await res.json();
  if(data.status==='ok'){
    const notification = data.msg;
    if(notification.length!==0){
    return (
      <section className=' h-screen w-screen bg-[#F8F8F8]'>
        <Navbar email={email} navData={false}/>
        <div className='w-screen flex flex-col items-center'>
        <span className='text-gray-800 mx-auto h-14 bg-white rounded-full font-mono w-[95vw] md:w-[80vw] lg:w-[60vw] flex justify-between px-6 items-center border border-gray-300  shadow '>
          <h1 className='text-2xl md:text-3xl'>Notifications</h1>
          <Link className='' href={`/home/${email}`}>
            <button className='bg-gray-700 transition-all duration-200 hover:bg-slate-400 flex h-max items-center text-white text-xl rounded-full pl-3 pr-4 py-2'>
              <LeftArrow/> Home
            </button>
          </Link>
        </span>
          <Suspense fallback={<NotfSkel/>}>
            {
                notification.map((data:any)=>(
                  <>
                  <NotfCard friendID={data.sender.id} email={email} friendName={data.sender.name} friendImage={data.sender.profilePicture || userDefaultImage}/>
                </>
                ))
            }    
          </Suspense>
        </div>
      </section>
    )
  }
  else{
    return(
      <>
        <section className=' h-screen w-screen bg-[#F8F8F8]'>
        <Navbar email={email} navData={false}/>
        <span className='text-gray-800 mx-auto h-14 bg-white rounded-full font-mono w-[95vw] md:w-[80vw] lg:w-[60vw] flex justify-between px-6 items-center border border-gray-300  shadow '>
          <h1 className='text-2xl md:text-3xl'>Notifications</h1>
          <Link className='' href={`/home/${email}`}>
            <button className='bg-gray-700 transition-all duration-200 hover:bg-slate-500 flex h-max items-center text-white text-xl rounded-full pl-3 pr-4 py-2'>
              <LeftArrow/> Home
            </button>
          </Link>
        </span>
          <div className='w-screen h-[70vh] flex justify-center items-center'>
            You Currently have no Notifications
          </div>
        </section>
      </>
    )
  }
  
}
else{
  return(
    <>
      <section className=' h-screen w-screen bg-[#F8F8F8]'>
      <Navbar email={email} navData={false}/>
      <span className='text-gray-800 mx-auto h-14 bg-white rounded-full font-mono w-[95vw] md:w-[80vw] lg:w-[60vw] flex justify-between px-6 items-center border border-gray-300  shadow '>
          <h1 className='text-2xl md:text-3xl'>Notifications</h1>
          <Link className='' href={`/home/${email}`}>
            <button className='bg-gray-700 transition-all duration-200 hover:bg-slate-400 flex h-max items-center text-white text-xl rounded-full pl-3 pr-4 py-2'>
              <LeftArrow/> Home
            </button>
          </Link>
        </span>
        <div className='w-screen h-[70vh] flex justify-center items-center'>
          You Currently have no Notifications
        </div>
      </section>
    </>
  )
}

  }