import React from 'react'
import Link from 'next/link'

export default function Sidebar({email}:any) {
  return (
    <>
      <main className=' overflow-hidden  '>
        <ul className='bg-[#F8F8F8] flex flex-col items-center space-y-2 pt-4 font-serif font-medium'>
            <Link href={`/home/${email}`}>
              <li className="px-4 py-2  bg-[#58b8e8] text-white rounded-lg w-[15vw] flex justify-center  text-lg">Home</li>
            </Link>
            <Link href={`/friends/${email}`}>
              <li className="px-4 py-2 bg-[#58b8e8]  text-white rounded-lg w-[15vw]  flex justify-center  text-lg">
                Friends
              </li>
            </Link>
            <Link href={`/notifications/${email}`}>
              <li className="px-4 py-2 bg-[#58b8e8]  text-white rounded-lg w-[15vw]  flex justify-center  text-lg">
                Notifications
              </li>
            </Link>
            <Link href={`/faq/${email}`}>
              <li className="px-4 py-2 bg-[#58b8e8]  text-white rounded-lg w-[15vw]  flex justify-center  text-lg">
                FAQ
              </li>
            </Link>
        </ul>
      </main>
    </>
  )
}
