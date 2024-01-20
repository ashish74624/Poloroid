import React from 'react'
import Image from 'next/image'

export default function PersonalPost({src,title}:any) {
  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white text-zinc-800 rounded-lg overflow-ellipsis border w-[285px] h-max">
        <img
          src={src}
          alt="Post"
          className="aspect-video object-cover w-[285px] h-56"
        />
        <div className="flex w-full justify-center items-center h-12 font-bold">
            {title}
        </div>
      </div>
    </>
  )
}
