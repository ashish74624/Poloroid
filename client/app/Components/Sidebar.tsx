import React from 'react'

export default function Sidebar() {
  return (
    <>
      <main className=' overflow-hidden  '>
        <ul className='bg-[#F8F8F8] fixed z-10 h-[94vh] w-[17vw] border-r border-gray-600 flex flex-col items-center space-y-2 pt-4'>
            <li className='px-4 py-2 bg-[#71B1D1] text-white rounded-lg w-[15vw] font-serif font-medium flex justify-center  text-lg'>Home</li>
            <li className='px-4 py-2 bg-[#71B1D1] bg-opacity-60 text-white rounded-lg w-[15vw] font-serif font-medium flex justify-center  text-lg'>Notifications</li>
        </ul>
      </main>
    </>
  )
}
