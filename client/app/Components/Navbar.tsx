import React from 'react'
import {Lobster} from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const lob = Lobster({
  subsets:['cyrillic'],
  weight:'400'
})

interface NavbarProps {
  userImg: string;
}

export default function Navbar({userImg}:NavbarProps) {
  return (
    <>
    <nav className=' border-b border-gray-600'>
      <div className='w-[80vw] h-16  flex justify-between mx-auto '>
        <span className={`${lob.className}  text-4xl text-transparent bg-clip-text  bg-gradient-to-r from-pink-500 to-purple-400 pt-1`}>Stay</span>
        <span className='pt-2'>
          <Link href={'/dashboard'}>
          <Image className="w-12 h-12 rounded-full border-2 border-gray-700 p-1" src={userImg} alt ={"Helo"} width={100} height={100}/>
          </Link>
        </span>
      </div>
      </nav>
    </>
  )
}
