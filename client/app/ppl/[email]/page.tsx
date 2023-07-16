import React from 'react'
import UserCard from '@/app/Components/UserCard';
import RightSidebar from '@/app/Components/RightSidebar';
import Navbar from '@/app/Components/Navbar';

type Params={
    params:{
      email:string
    }
}

export default async function ppl({params:{email}}:Params) {
    const res = await fetch(`http://localhost:3001/getFriendSuggestions/${email}`);
    const data = await res.json();
  return (
    <>
    <Navbar navData={false} email={email}/>
      <section className='w-screen flex flex-col h-max items-center'>
      {data.map((data:any)=>(
            <>
            <RightSidebar profileImage={data.profileImage} id={data._id} email={email} firstName={data.firstName} lastName={data.lastName} />
            </>
          ))}
      </section>
    </>
  )
}
