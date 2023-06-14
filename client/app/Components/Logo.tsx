import React from 'react'
import {Lobster} from 'next/font/google'

const lob = Lobster({
  subsets:['cyrillic'],
  weight:'400'
})

export default function Logo() { 
  return (
    <main className='relative h-full w-full justify-center flex items-center '>
      <div className='animate-bubble shadow-2xl shadow-black h-[370px] w-[370px] bg-yellow-300 rounded-full flex justify-center items-center'>
      </div>
      <h3 className={`${lob.className} absolute text-[12rem] font-light mb-7 text-transparent bg-clip-text  bg-gradient-to-r from-pink-500 to-purple-400`}>Stay</h3>
    </main>
  )
}
