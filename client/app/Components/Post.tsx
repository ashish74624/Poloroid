'use client'

import React from 'react'
import { useState,useEffect } from 'react';
import Image from 'next/image';
import { Kaushan_Script } from 'next/font/google';
import { Amatic_SC } from 'next/font/google';
import PostSkel from './PostSkel';
import userDefaultImage from '@/public/userDefaultImage.webp'

const ks = Kaushan_Script({
    subsets:['latin'],
    weight:'400'
})

// async function getPostData(email:any) {
  // const res = await fetch(`http:localhost:3001/postsData/${email}`);
//   return res.json();
// }

// // async function getPostImage(email:any) {
// //   const res = await fetch(`http:localhost:3001/postsImage/${email}`);
// //   return res.json();
// // }

// async function getAllData(email:any) {
//   const res = await fetch(`http:localhost:3001/posts/${email}`);
//   return res.json();
// }



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


export default async function Post({userImg,email}:any) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [data, setData] = useState<Post[]>([]);
    const [go,setGo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isDataLoading,setIsDataLoading] = useState(true);

    useEffect(()=>{
      const getPostData=async()=>{
        let res = await fetch(`http://localhost:3001/postsData/${email}`);
        
          let data = await res.json()
        
        setPosts(data);
        setIsDataLoading(false)
      }
      getPostData();

    },[email]);
    useEffect(()=>{
     const getData=async()=>{
      let res = await fetch(`http://localhost:3001/posts/${email}`); 
      let data = await res.json();
      setPosts(data);
      setIsLoading(false);

    }
    getData();
   },[]);
 
    
  return (
    <>
      {
        isDataLoading?
        (
        <>
          <PostSkel/>
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
        <Image className='w-8 h-8 rounded-full' src={userImg} alt='User Profile' width={100} height={100}/>
        <p className='text-white mb-1 hover:underline cursor-pointer w-max'>{post.firstName || 'John'} {post.lastName || 'Doe'}</p>
      </div>
      <div className='relative w-[22vw] h-[58vh] px-6 pt-5 flex flex-col items-center bg-white   border border-[#1d1d1f] shadow-xl'>
                <Image className='w-[297px] h-[347px] overflow-hidden' src={post.image || userDefaultImage} alt='Hello' width={100} height={100} />
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
          </>
        )
        }
        </>
        )
      }  