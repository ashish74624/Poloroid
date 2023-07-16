import React from 'react'
import UserCard from './UserCard';

export default async function Suggest({email}:any) {
    const res = await fetch(`http://localhost:3001/getFriendSuggestions/${email}`);
    const data = await res.json();
  return (
    <>
    <section className='bg-white w-[40vw] h-max'>
        {
            data.map((data:any)=>{
                <>
                    <UserCard profileImage={data.profileImage} id={data._id} firstName={data.firstName} lastName={data.lastName} emailOfUser={email}/>
                </>
            })
        }
    </section> 
    </>
  )
}
