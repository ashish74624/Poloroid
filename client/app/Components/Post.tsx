import React from 'react'
import Image from 'next/image'
import DropZone from './DropZone'
import Upload from './Upload'


export default function Post({userImg}:any) {
  return (
    <>
      <div className=' h-max mt-2 w-[50vw] bg-gray-300 rounded-md'>
      <Image className="w-12 h-12 rounded-full ml-10 mt-5  p-1 inline" src={userImg} alt ={"Helo"} width={100} height={100}/>
        <input className='h-10 w-[40vw] rounded-full float-right m-6 px-4 shadow' type="text" placeholder="What's on your mind Today?" />
        <p className='mx-[10vw] mb-3'>
        <Upload/>
        </p>
        <button className='bg-purple-700 w-[40vw] mx-[5vw] mb-3 h-10 rounded-full text-2xl text-white'>post</button>
      </div>
    </>
  )
}
