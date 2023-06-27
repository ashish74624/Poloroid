import React from 'react'
import UserCard from './UserCard'

export default function RightSidebar() {
  return (
    <ul className=' overflow-y-scroll h-[94vh] z-10 fixed w-[25vw] border border-gray-600 flex flex-col items-center space-y-2 pt-4 right-0'>
      <li>
        <UserCard/>
      </li>
    </ul>
  )
}
