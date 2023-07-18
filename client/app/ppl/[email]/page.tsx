import React from 'react'
import RightSidebar from '@/app/Components/RightSidebar';
import Navbar from '@/app/Components/Navbar';

type Params={
    params:{
      email:string
    }
}

let backendURL = process.env.BACKEND || 'http://localhost:3001'

export default async function ppl({params:{email}}:Params) {
    const res = await fetch(`${backendURL}/getFriendSuggestions/${email}`);
    const data = await res.json();
  return (
    <>
    <Navbar navData={false} email={email}/>
      <section className='w-screen flex flex-col h-max items-center bg-[#F8F8F8]'>
      {data.map((data:any)=>(
            <>
            <RightSidebar profileImage={data.profileImage} id={data._id} email={email} firstName={data.firstName} lastName={data.lastName} />
            </>
          ))}
      </section>
    </>
  )
}
