'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Kalam } from 'next/font/google';
import { cloud_name, placeholderImage } from '../libs/configs';

const backendURL = process.env.BACKEND;

const kst = Kalam({
  weight: ['400'],
  subsets: ['devanagari'],
});

interface PostProps {
  id: string;
  firstName: string;
  lastName: string;
  caption: string;
  image: string;
  email: string;
  likes: number;
  likedBy: any[];
  userProfile: string;
  userID: string;
}

export default function Card({ id, firstName, lastName, email, userProfile, likes, likedBy, image, caption, userID }: PostProps) {
  const [like, setLike] = useState(likes);
  const [isLiked, setIsLiked] = useState(likedBy.some(obj => obj.id === userID));

  const userProfileUrl = cloud_name ? `https://res.cloudinary.com/${cloud_name}/image/upload/v1688970909/${userProfile}` : placeholderImage;
  const imageUrl = cloud_name ? `https://res.cloudinary.com/${cloud_name}/image/upload/v1687762741/${image}` : placeholderImage;

  const handleLike = async () => {
    try {
      await fetch(`${backendURL}/post/like/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOfUser: email }),
      });
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const toggleLiking = () => {
    setLike(prev => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
    handleLike();
  };

  return (
    <section className="md:pb-0 pb-2">
      <section key={id} className="bg-[#58b8e8] w-[360px] my-2 md:w-[400px] h-max flex flex-col rounded-md items-center">
        <span className="flex space-x-2 mx-auto py-2 items-center w-[310px] md:w-[360px]">
          <Image src={userProfileUrl} className="w-10 h-10 rounded-full" alt="userImage" width={100} height={100} />
          <h5 className="text-white text-lg">{firstName} {lastName}</h5>
        </span>
        <div className="bg-white h-max w-[320px] md:w-[360px] border border-black">
          <Image src={imageUrl} className="md:w-[300px] w-[270px] h-96 mx-auto mt-[25px] md:mt-[30px]" alt="Image" width={500} height={500} />
          <p className={`${kst.className} md:w-[300px] w-[260px] mx-auto py-3 md:py-5 flex justify-center items-center overflow-scroll`}>
            {caption}
          </p>
        </div>
        <button
          className={`rounded-b-md flex justify-center items-center flex-grow py-3 text-2xl w-[360px] md:w-[400px] focus:outline-[#F8C732] transition duration-300 ${isLiked ? 'text-yellow-500' : 'text-white hover:text-[#F8C732]'
            } bg-[#58b8e8]`}
          onClick={toggleLiking}
        >
          Like {like}
        </button>
      </section>
    </section>
  );
}
