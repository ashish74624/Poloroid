import React from 'react'
import Link from 'next/link'

export default function Sidebar({home,notifications,email}:any) {
  return (
    <>
      <main className=' overflow-hidden  '>
        <ul className='bg-[#F8F8F8] flex flex-col items-center space-y-2 pt-4'>
            <Link href={`/home/${email}`}>
              <li className={`px-4 py-2 ${home} bg-[#58b8e8] text-white rounded-lg w-[15vw] font-serif font-medium flex justify-center  text-lg`}>Home</li>
            </Link>
            <Link href={`/notifications/${email}`}>
              <li className={`px-4 py-2 bg-[#58b8e8] ${notifications} text-white rounded-lg w-[15vw] font-serif font-medium flex justify-center  text-lg`}>
                Notifications
              </li>
            </Link>
        </ul>
      </main>
    </>
  )
}
