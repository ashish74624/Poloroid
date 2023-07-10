'use client'
import React, { useState } from 'react'
import Image from 'next/image'

interface UserCard{
  profileImage:string,
  id:string,
  firstName:string,
  lastName:string,
  emailOfUser:string
}

export default function UserCard({profileImage,id,firstName,lastName,emailOfUser}:UserCard) {
  
  const [request,setRequest] = useState(false);

  const sendNotification= async() => {
    const res = await fetch(`http://localhost:3001/sendNotifiaction/${id}`,{
      method:'PUT',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        emailOfUser: emailOfUser,
      })
    });
    const data = await res.json();
    if(data.status ==="ok"){
      setRequest(true);
    }
  }
  return (
        <>
        
          <div className="w-[16vw] bg-white border border-gray-300 rounded-lg shadow ">
            <div className="flex flex-col items-center pb-6">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg mt-6" src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1687762741/${profileImage}`} alt="Friend" width={100} height={100}/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 ">{firstName} {lastName}</h5>
                {
                  request
                  ?
                  (
                  <>
                    <div className='w-40 py-2 mt-4 bg-[#58b8e8] text-white flex justify-center rounded-lg'>
                      Request sent 
                    </div>
                  </>
                  )
                  :
                  (
                  <>
                    <div className="flex mt-2 space-x-3">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#58b8e8] rounded-lg hover:bg-[#4cc3ff] focus:ring-4 focus:outline-none focus:ring-blue-300 "
                    onClick={sendNotification}
                    >Add friend</button>
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ">Remove</button>
                </div>
                  </>
                  )
                }
                
            </div>
          </div>

        </>
  )
}
