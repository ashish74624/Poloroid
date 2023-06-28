import React from 'react'

export default function NotfSkel() {
  return (
    <>
     <section className=' animate-pulse bg-white h-16 my-3 w-[50vw] rounded-lg shadow flex items-center justify-between'>
        <span className='flex ml-4'>
            <div className='w-11 h-11 rounded-full bg-gray-500' ></div>
            <h4 className='pt-[0.375rem] pl-2 bg-slate-300 h-2.5 rounded-full  w-32'></h4>
        </span>
        <span className='space-x-4 mr-4'>
            <button className='bg-[#58b8e8] hover:bg-[#4cc3ff] px-7 text-white py-2 rounded-lg transition duration-300'>
                Accept
            </button>
            <button className='bg-red-500 hover:bg-red-700 transition duration-300 px-7 text-white py-2 rounded-lg'>Reject</button>
        </span>
      </section> 
    </>
  )
}
