'use client'
import React from 'react'
import Image from 'next/image'



let backendURL = process.env.BACKEND

interface NoftCardProps {
  friendImage ?: string;
  friendName: string;
  email:string;
  friendID : string;
}


export default async function NotfCard({friendImage,friendName,email,friendID}:NoftCardProps) {
  const handleAddFriend =async ()=>{

    const addFriend = await fetch(`${backendURL}/addFriend/${email}`,{
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

  const rejectRequest= async()=>{
    const res = await fetch(`${backendURL}/rejectRequest/${friendID}`,{
      method:"PUT",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({email:email})
    });
    if(res.ok){
      window.location.reload()
    }
  }
    
        return (
            <>
              <section className='bg-white h-32 md:h-16 my-3 w-[95vw] md:w-[80vw] lg:w-[60vw] rounded-lg shadow flex md:flex-row flex-col md:items-center md:justify-between'>
                <span className='flex ml-4 md:py-0 py-3'>
                    <Image className=' w-14 h-14 md:w-11 md:h-11 rounded-lg md:rounded-full' src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1687762741/${friendImage}`}
                    alt='Notification' height={100} width={100}/>
                    <h4 className='pt-[0.375rem] pl-2 text-[#F8C732] font-bold text-2xl md:text-lg'>{friendName}</h4>
                    <p className='pt-2 pl-2 font-normal text-xl md:text-base'>wants to be your friend</p>
                </span>
                <div className='space-x-4 md:mr-4 mx-auto w-max'>
                    <button className='bg-[#58b8e8] hover:bg-[#4cc3ff] px-4 lg:px-7 text-white py-2 md:py-1 lg:py-2 rounded-lg transition duration-300 w-[40vw] md:w-max'
                    onClick={()=>{handleAddFriend()}}
                    >
                        Accept
                    </button>
                    <button className='bg-red-500 hover:bg-red-700 transition duration-300 px-4 lg:px-7 text-white py-2 md:py-1 lg:py-2 rounded-lg w-[40vw] md:w-max'
                    onClick={()=>{rejectRequest() }}
                    >Reject</button>
                </div>
              </section>
            </>
          )
    
  
}
