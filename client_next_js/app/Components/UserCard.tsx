'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { cloud_name } from '../libs/configs'
import { Button } from './ui/button'


interface UserCard {
  profileImage: string,
  id: string,
  firstName: string,
  lastName: string,
  emailOfUser: string
}

let backendURL = process.env.BACKEND

export default function UserCard({ profileImage, id, firstName, lastName, emailOfUser }: UserCard) {

  const [request, setRequest] = useState(false);
  const [reject, setReject] = useState(false);

  const sendNotification = async () => {
    const res = await fetch(`${backendURL}notification/sendNotification/${id}/`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailOfUser: emailOfUser,
      })
    });
    const data = await res.json();
    if (data.status === "ok") {
      setRequest(true);
    }
  }

  const removeSuggestion = async () => {
    const res = await fetch(`${backendURL}user/removeSuggestion/${id}/`, {
      method: "PUT",
      headers: {
        'content-type': "application/json",
      },
      body: JSON.stringify({ email: emailOfUser })
    });

    const data = res.json();
    if (res.ok) {
      setReject(true);
    }
  }

  console.log("profileImage", profileImage)

  return (
    <div className=" w-56 md:w-[20vw] lg:w-[16vw] bg-white border border-gray-500 rounded-lg shadow-md ">
      <div className="flex flex-col items-center lg:pb-6 pb-3">
        <Image className=" w-32 h-32 md:w-16 md:h-16 lg:w-24 lg:h-24 mb-3 rounded-full shadow-lg mt-3 lg:mt-6" src={profileImage} alt="Friend" width={100} height={100} />
        <h5 className="mb-1 text-2xl md:text-base lg:text-xl font-medium text-gray-900 ">{firstName} {lastName}</h5>
        {
          request
            ?
            (

              <div className='w-40 md:w-36 lg:w-40 py-2 mt-4 bg-[#58b8e8] text-white flex justify-center rounded-lg'>
                Request sent
              </div>
            )
            :
            (
              reject ?
                (
                  <div className=' w-40 md:w-36 lg:w-40 py-2 mt-4 bg-[#58b8e8] text-base lg:text-base md:text-xs text-white flex justify-center rounded-lg'>
                    Suggestion Removed
                  </div>
                )
                :
                (

                  <div className="flex flex-col mt-2 gap-2">
                    <Button className='text-sm'
                      onClick={sendNotification}
                    >Add friend</Button>
                    <Button className="text-sm text-gray-900 bg-white border border-gray-300  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 "
                      onClick={removeSuggestion}
                    >Remove</Button>
                  </div>
                )

            )
        }

      </div>
    </div>
  )
}
