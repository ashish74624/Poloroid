import React from 'react'
import Image from 'next/image'
import userDefaultImage from '@/public/userDefaultImage.webp'
import { Comfortaa } from 'next/font/google'
import MyIcon from '@/app/Components/MyIcon'


const Com = Comfortaa({
    subsets:['cyrillic'],
    weight:'400'
  })
  

export default function NavbarSkel() {
  return (
    <>
      {/* Navbar Start */}
      <nav className=' border-b border-gray-600 bg-[#F8F8F8] w-screen'>
      <div className={`w-[80vw] h-[9vh]  flex justify-between  mx-auto`}>
        
          <span className={`${Com.className}  text-3xl  bg-clip-text text-[#58b8e8] mt-3`}>
            polaroid
            </span>
          <span className=' flex '>
          <Image className="w-12 h-12 rounded-full border-2 mt-2 border-[#F8C732] p-1 mr-3" src={ userDefaultImage} alt ={"Helo"} width={100} height={100}/>
          <button>
            <MyIcon/>
          </button>
        </span>
        </div>
        </nav>
      {/* Navbar End */}
    </>
  )
}
