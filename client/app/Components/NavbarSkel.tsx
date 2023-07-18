import React from 'react'
import Image from 'next/image'
import userDefaultImage from '@/public/userDefaultImage.webp'
import { Comfortaa } from 'next/font/google'


const Com = Comfortaa({
    subsets:['cyrillic'],
    weight:'400'
  })
  

export default function NavbarSkel() {
  return (
    <>
      {/* Navbar Start */}
      <nav className=' border-b border-gray-600 bg-[#F8F8F8] w-screen'>
      <div className={`w-[80vw] h-[8vh] lg:h-[9vh]  flex justify-between  mx-auto items-center`}>
        
          <span className={`${Com.className}  text-3xl  bg-clip-text text-[#58b8e8]`}>
            polaroid
            </span>
          <span className=' flex '>
          <Image className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[#F8C732] p-1 mr-3" src={ userDefaultImage} alt ={"Helo"} width={100} height={100}/>
          <button disabled className="flex items-center justify-center bg-[#F8C732] text-white font-bold w-10 h-10 lg:w-12 lg:h-12 rounded-full ">
      <svg className="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
      </svg>

          </button>
        </span>
        </div>
        </nav>
      {/* Navbar End */}
    </>
  )
}
