import React from 'react'

export default function Sidebar() {
  return (
    <>
      <main className=' overflow-hidden'>
        <ul className='bg-[#e8d3ce] h-[89vh] w-[17vw] mx-4 my-1 rounded-lg flex flex-col items-center space-y-2 pt-4'>
            <li className='px-4 py-2 bg-purple-700 text-white rounded-lg w-[15vw] font-serif font-medium flex justify-center  text-lg'>Home</li>
            <li className='px-4 py-2 bg-purple-400 bg-opacity-60 text-gray-900 rounded-lg w-[15vw] font-serif font-medium flex justify-center  text-lg'>Notifications</li>
        </ul>
      </main>
    </>
  )
}
