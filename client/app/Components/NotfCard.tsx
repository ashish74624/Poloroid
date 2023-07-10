'use client'
import React from 'react'
import Image from 'next/image'

export default async function NotfCard({friendImage,friendName,email,friendID}:any) {
  const handleAddFriend =async ()=>{

    const addFriend = await fetch(`http://localhost:3001/addFriend/${email}`,{
      method:'PUT',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        friendID:friendID,
        friendName:friendName,
        friendImage:friendImage
      })
    });
    const res = await addFriend.json();
    if(res.status==="ok"){
      window.location.reload()
    }
  }
    
        return (
            <>
              <section className='bg-white h-16 my-3 w-[50vw] rounded-lg shadow flex items-center justify-between'>
                <span className='flex ml-4'>
                    <img className='w-11 h-11 rounded-full' src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1687762741/${friendImage}`} alt='Notification' height={100} width={100}/>
                    <h4 className='pt-[0.375rem] pl-2 text-[#F8C732] font-bold text-lg'>{friendName}</h4>
                    <p className='pt-2 pl-2 font-normal'>wants to be your friend</p>
                </span>
                <span className='space-x-4 mr-4'>
                    <button className='bg-[#58b8e8] hover:bg-[#4cc3ff] px-7 text-white py-2 rounded-lg transition duration-300'
                    onClick={()=>{handleAddFriend()}}
                    >
                        Accept
                    </button>
                    <button className='bg-red-500 hover:bg-red-700 transition duration-300 px-7 text-white py-2 rounded-lg'>Reject</button>
                </span>
              </section>
            </>
          )
    
  
}
