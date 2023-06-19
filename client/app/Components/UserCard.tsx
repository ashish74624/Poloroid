import React from 'react'
import Image from 'next/image'

export default function UserCard() {
  return (
    <>
      
<div className="w-[20vw] bg-white border border-gray-200 rounded-lg shadow">
    <div className="flex justify-end px-4 pt-8">
    </div>
    <div className="flex flex-col items-center pb-10">
        <Image className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/stat.jpg" alt="Bonnie image" width={100} height={100}/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 ">Bonnie Green</h5>
        <span className="text-sm text-gray-500 ">Visual Designer</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
            <a href='/' className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">Add friend</a>
            <a href='/' className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ">Message</a>
        </div>
    </div>
</div>

    </>
  )
}
