'use client'

import React from 'react'
import { useState,useEffect } from 'react';
import Image from 'next/image';
import { Kaushan_Script } from 'next/font/google';
import { Amatic_SC } from 'next/font/google';

const ks = Kaushan_Script({
    subsets:['latin'],
    weight:'400'
})

const as = Amatic_SC({
  subsets:['hebrew'],
  weight:'700'
})

interface Post {
    _id: string;
    firstName:string;
    lastName:string;
    caption: string;
    image: string;
    email: string;
  }


export default async function PostF1({email}:any) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getPosts = async () => {
          try {
            if(email){
                const response = await fetch(`http://localhost:3001/posts/${email}`);
                const articles = await response.json();
                setPosts(articles);
                setIsLoading(false)
            }
          } catch (error) {
            console.log(error);
          }
        };
  
        getPosts();
      }, [email]);
    
  return (
    <>
      {
        isLoading?
        (
        <>
        <div role="status" className="w-[35vw] my-7 h-[60vh] p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 bg-[#71B1D1] ">
<div className="flex items-center mt-4 space-x-3">
        <svg className="text-gray-200 w-14 h-14 " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
        <div>
            <div className="h-2.5 bg-gray-500 rounded-full  w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-500 rounded-full "></div>
        </div>
    </div>
    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded ">
        <svg className="w-12 h-12 text-gray-200 " xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
    </div>
    <div className="h-2.5 bg-gray-500 rounded-full  w-48 mb-4"></div>
    <div className="h-2 bg-gray-500 rounded-full  mb-2.5"></div>
    <div className="h-2 bg-gray-500 rounded-full mb-2.5"></div>
    <div className="h-2 bg-gray-500 rounded-full "></div>
    
    <span className="sr-only">Loading...</span>
</div>
<div role="status" className="w-[35vw] my-7 h-[60vh] p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 bg-[#71B1D1] ">
<div className="flex items-center mt-4 space-x-3">
        <svg className="text-gray-200 w-14 h-14 " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
        <div>
            <div className="h-2.5 bg-gray-500 rounded-full  w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-500 rounded-full "></div>
        </div>
    </div>
    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded ">
        <svg className="w-12 h-12 text-gray-200 " xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
    </div>
    <div className="h-2.5 bg-gray-500 rounded-full  w-48 mb-4"></div>
    <div className="h-2 bg-gray-500 rounded-full  mb-2.5"></div>
    <div className="h-2 bg-gray-500 rounded-full mb-2.5"></div>
    <div className="h-2 bg-gray-500 rounded-full "></div>
    
    <span className="sr-only">Loading...</span>
</div>
        </>
        ):
        (
        <>
        {posts.map((post)=>{
            return(
            <>
            <div className='my-5'>
    <div key={post._id} className='bg-[#71B1D1] w-max h-max px-6 pt-3 pb-4 rounded-t '>
      <div className='flex space-x-3 mb-4'>
        <Image className='w-8 h-8 rounded-full' src={post.image} alt='User Profile' width={100} height={100}/>
        <p className='text-white mb-1 hover:underline cursor-pointer w-max'>{post.firstName || 'John'} {post.lastName || 'Doe'}</p>
      </div>
      <div className='relative w-[22vw] h-[58vh] px-6 pt-5 flex flex-col items-center bg-white   border border-[#1d1d1f] shadow-xl'>
                <Image className='w-[297px] h-[347px] overflow-hidden' src={post.image} alt='Hello' width={100} height={100} />
                <div className="">
                <p className={` ${ks.className} w-[21.8vw] h-16 px-4 bg-white flex justify-center items-center`}>{post.caption}</p>
                </div>
      </div>
    </div>
      <button className={`${as.className} text-3xl w-[386px] rounded-b py-1 h-max text-[#F8C732] bg-[#71B1D1] hover:bg-[#77a4bc] transition duration-300`}>Like</button>
    </div>
            </>
            )
        })}
        </>)
        
      }
    </>
    
  )
}
