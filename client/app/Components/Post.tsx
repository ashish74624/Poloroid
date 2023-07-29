'use client'

import React, { useState, useEffect } from 'react';
import PostSkel from './PostSkel';
import { Kaushan_Script } from 'next/font/google';
import { Nixie_One } from 'next/font/google';
import Image from 'next/image';
import Card from './Card';

const kst = Kaushan_Script({
  subsets:['latin'],
  weight:'400'
})

const Nxo = Nixie_One({
  weight:'400',
  subsets:['latin']
})


interface Post {
  _id: string;
  firstName: string;
  lastName: string;
  caption: string;
  image: string;
  email: string;
  likes: number;
  isLiked: boolean;
  userProfile:string;
}
interface PostProps {
  id: string;
  firstName: string;
  lastName: string;
  caption: string;
  image: string;
  email: string;
  likes: number;
  likedBy: string[];
  userProfile:string;
  userID:string;
}

interface Props {
  email: string;
}
type props ={
  promise : Promise<Post[]>,
  email:string,
  userId:string
}

let backendURL = process.env.BACKEND

export default async function Post({promise,email,userId}:props) {
  const postData = await promise

  const handleLike=(id:string)=>{
    
  }

  return (
    <>
    {
      postData.map((post:any)=>(
        <main key={post._id}>
          <Card id={post._id} firstName={post.firstName} lastName={post.lastName} email={email} userProfile={post.userProfile} likes={post.likes} likedBy={post.likedBy} image={post.image} caption={post.caption} userID={userId}  />
        </main>
      ))
    }    
    </>
  );
};
