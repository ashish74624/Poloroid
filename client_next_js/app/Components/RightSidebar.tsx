import React from 'react'
import UserCard from './UserCard'

interface Friend{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

export default async function RightSidebar({email,id,profileImage,firstName,lastName}:Friend) {
        return (
          <ul className=' overflow-y-scroll flex flex-col items-center space-y-2 pt-4 right-0'>
            <li key={id}>
              <UserCard profileImage={profileImage} id={id} firstName={firstName} lastName={lastName} emailOfUser={email}  />
            </li>
          </ul>
        )
      
      
      }