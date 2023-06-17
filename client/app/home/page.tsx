'use client'

import React from 'react'
import getToken from '../lib/getToken'
import Link from 'next/link'
import jwt from 'jsonwebtoken'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Post from '../Components/Post'
// import Upload from '../Components/Upload'

export default function home() {
  let token = getToken()
  if(!token){
    return (
      <>
      <main className='h-screen w-screen flex flex-col justify-center items-center'>
        Loading...
      </main>
      </>
    )
  }
  const data = jwt.decode(token);
  if(typeof data === 'object' && data !== null){
    const email = data.email;
    const userImg = data.profileImage;
    return(
      <body className='bg-[#ECE3E1]'>
        <Navbar userImg={userImg}/>
        <main className='flex'>
          <Sidebar/>
          <Post userImg={userImg} userEmail={email}/>
          {/* <Upload/> */}
        </main>
      </body>
    )
  }
}
