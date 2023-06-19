import React from 'react'
import Image from 'next/image'

export default function PostCard() {
  return (
    <>
     <div className='w-[30vw] h-max  bg-[#f5f5f7] rounded-xl flex flex-col'>
      <button className='bg-blue-100 hover:bg-blue-200 text-blue-500 w-full flex justify-center rounded-t-xl items-center font-light h-12 mb-7'>Name</button>
        <span className='w-[30vw] flex flex-col items-center '>
          <div className='w-[22vw] border-[#1d1d1f] border shadow-xl'>
            <Image className='w-[22vw] h-[39vh]' unoptimized={true} src={'/2.jpg'} alt='hello' width={100} height={100}/>
            <caption className='px-1 w-[21.9vw] pt-3 pb-2 bg-[#f7f5f3] '>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae! Voluptatem voluptas nobis magni ipsam
            </caption>
          </div>
        </span>
        <button className='text-red-500 bg-red-200 hover:bg-red-300 w-full h-10 mt-7 rounded-b-xl'>Like</button>
    </div> 
    </>
  )
} 
