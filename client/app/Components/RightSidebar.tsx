'use client'
import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import UserSkel from './UserSkel';

interface Friend{
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

interface RightSidebarProps{
  email:string
}

export default function RightSidebar({email}:RightSidebarProps) {
  const [friend,setFriend] = useState<Friend[]>([]);
  const [isData,setIsData] = useState(false);

  useEffect(()=>{
    async function getFriendSuggestions(email:any) {
      const res = await fetch(`http://localhost:3001/getFriendSuggestions/${email}`);
      const data = await res.json();
      setFriend(data);
      setIsData(true)
    }
    getFriendSuggestions(email);
  },[email])
  return (
    <ul className=' overflow-y-scroll h-[94vh] z-10 fixed w-[25vw] border border-gray-600 flex flex-col items-center space-y-2 pt-4 right-0'>
      <h3 className='text-xl mb-2'>People you may know</h3>
      {
          isData ?
          (
          <>
          {friend.map((friend)=>(
      <>
      <li key={friend._id}>
        <UserCard profileImage={friend.profileImage} id={friend._id} firstName={friend.firstName} lastName={friend.lastName} email={email} />
      </li>
      </>
    ))}
          </>
          )
          :
          (
          <>
          <UserSkel/>
          </>
          )
        }
    
      
    </ul>
  )
}
