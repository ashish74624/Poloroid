import React from 'react'
import {Lobster} from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { Comfortaa } from 'next/font/google'
import MyIcon from './MyIcon'
import { useVisible } from '../Context/VisibilityContext';
import Modal from './Modal'

const Com = Comfortaa({
  subsets:['cyrillic'],
  weight:'400'
})

interface NavbarProps {
  userImg: string;
}

export default function Navbar({userImg}:NavbarProps) {
  const { visibilty,setVisibility }:any = useVisible();
  return (
    <>
    <nav className=' border-b border-gray-600 fixed top-0 z-20 bg-[#F8F8F8] w-screen'>
      <div className='w-[80vw] h-16  flex justify-between mx-auto '>
        <span className={`${Com.className}  text-3xl  bg-clip-text text-[#71B1D1] pt-2`}>polaroid</span>
        <span className='pt-2 flex '>
          <Link href={'/dashboard'}>
          <Image className="w-12 h-12 rounded-full border-2 border-[#F8C732] p-1 mr-3" src={userImg} alt ={"Helo"} width={100} height={100}/>
          </Link>
          <button onClick={()=>{setVisibility('')}} >
          <MyIcon/>
          </button>
        </span>
      </div>
      </nav>
      <Modal/>
    </>
  )
}
