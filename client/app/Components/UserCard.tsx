'use client'
import React, { useState } from 'react'
import userDefaultImage from '@/public/userDefaultImage.webp'


interface UserCard{
  profileImage:string,
  id:string,
  firstName:string,
  lastName:string,
  emailOfUser:string
}

let backendURL = process.env.BACKEND

export default function UserCard({profileImage,id,firstName,lastName,emailOfUser}:UserCard) {
  
  const [request,setRequest] = useState(false);
  const [reject, setReject] = useState(false);

  const sendNotification= async() => {
    const res = await fetch(`${backendURL}/sendNotifiaction/${id}`,{
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

  const removeSuggestion= async()=>{
    const res = await fetch(`${backendURL}/removeSuggestion/${id}`,{
      method:"PUT",
      headers:{
        'content-type':"application/json",
      },
      body: JSON.stringify({email:emailOfUser})
    });
    
    const data = res.json();
    if(res.ok){
      setReject(true);
    }
  }

  return (
        <>
        
          <div className=" w-56 md:w-[20vw] lg:w-[16vw] bg-white border border-gray-300 rounded-lg shadow ">
            <div className="flex flex-col items-center lg:pb-6 pb-3">
                <img className=" w-32 h-32 md:w-16 md:h-16 lg:w-24 lg:h-24 mb-3 rounded-full shadow-lg mt-3 lg:mt-6" src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1687762741/${profileImage}`} 
                onError={(e:any) => {
                  e.target.src = {userDefaultImage};
                }}
                alt="Friend" width={100} height={100}/>
                <h5 className="mb-1 text-2xl md:text-base lg:text-xl font-medium text-gray-900 ">{firstName} {lastName}</h5>
                {
                  request
                  ?
                  (
                  <>
                    <div className='w-40 md:w-36 lg:w-40 py-2 mt-4 bg-[#58b8e8] text-white flex justify-center rounded-lg'>
                      Request sent 
                    </div>
                  </>
                  )
                  :
                  (
                    reject?
                    (
                    <>
                    <div className=' w-40 md:w-36 lg:w-40 py-2 mt-4 bg-[#58b8e8] text-base lg:text-base md:text-xs text-white flex justify-center rounded-lg'>
                      Suggestion Removed 
                    </div>
                    </>)
                    :
                    (
                    <>
                    <div className="flex lg:flex-row md:flex-col mt-2 md:mt-0 lg:mt-2 md:space-x-0 lg:space-y-0 md:space-y-2 space-x-2 lg:space-x-3">
                    <button className="inline-flex items-center px-4 md:px-6 lg:px-4 py-2 md:py-2 text-sm font-medium text-center text-white bg-[#58b8e8] rounded-lg hover:bg-[#4cc3ff] focus:ring-2 focus:outline-none focus:ring-[#F8C732] "
                    onClick={sendNotification}
                    >Add friend</button>
                    <button className="inline-flex items-center px-4 md:px-6 lg:px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 justify-center "
                    onClick={removeSuggestion}
                    >Remove</button>
                </div>
                  </>)
                  
                  )
                }
                
            </div>
          </div>

        </>
  )
}
