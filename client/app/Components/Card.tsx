'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Kaushan_Script } from 'next/font/google';
import { Kalam } from 'next/font/google';

let backendURL = process.env.BACKEND

const kst = Kalam({
  weight:['400'],
  subsets:['devanagari']
})

  interface PostProps {
    id: string;
    firstName: string;
    lastName: string;
    caption: string;
    image: string;
    email: string;
    likes: number;
    likedBy: any[];
    userProfile:string;
    userID:string;
  }

export default function Card({id,firstName,lastName,email,userProfile,likes,likedBy,image,caption,userID}:PostProps) {
    const [like,setLike]:[number, React.Dispatch<React.SetStateAction<number>>] = useState(likes);
    console.log(likedBy);
    console.log(userID);
    const [isLiked,setIsLiked] = useState(likedBy.some(obj=> obj.id===userID ));
    const debouncing = (func: any, delay: number) => {
      let timer: ReturnType<typeof setTimeout>;
      return function (this: any, ...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    };

    const handleLike=  async (id: any) => {
      const response = await fetch(`${backendURL}/post/like/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOfUser: email,
        }),
      });
    }

    function toggleLiking() {
      if(isLiked){
        setLike(prev=>prev-1);
        handleLike(id);
        setIsLiked(false)
      }else{
        setLike(prev=>prev+1);
        handleLike(id);
        setIsLiked(true)
      }
    }

    
  return (
    <>
      {isLiked 
      ?
      <section className='md:pb-0 pb-2'>
            <section key={id} className="bg-[#58b8e8] w-[360px] my-2 md:w-[400px] h-max flex flex-col rounded-md  items-center">
            <span className="flex space-x-2 mx-auto py-2 items-center w-[310px] md:w-[360px]">
                <Image
                src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1688970909/${userProfile}`}
                className="w-10 h-10 rounded-full" alt='userImage' width={100} height={100}
                />
                <h5 className="text-white text-lg font-serif">{firstName} {lastName}</h5>
            </span>
            <div className=" bg-white h-max w-[320px] md:w-[360px] border border-black">
                <Image
                src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1687762741/${image}`} className="md:w-[300px] w-[270px] h-96 mx-auto mt-[25px] md:mt-[30px]" alt ='Image' width={500} height={500} />
                <p className={` ${kst.className} md:w-[300px] w-[260px] mx-auto py-3 md:py-5 flex justify-center items-centern overflow-scroll `}>
                  {caption}
                </p>
            </div>
              <button className= {`font-serif rounded-b-md flex justify-center items-center flex-grow py-3 hover:text-[#F8C732] text-yellow-500  transition duration-300 bg-[#58b8e8] text-2xl w-[360px] md:w-[400px]  focus:outline-[#F8C732] `}
             onClick={() => { toggleLiking();  }}
            >
                Like {like}
            </button>
        </section>
        </section>
      :
      <section className='md:pb-0 pb-2'>
            <section key={id} className="bg-[#58b8e8] w-[360px] my-2 md:w-[400px] h-max flex flex-col rounded-md  items-center">
            <span className="flex space-x-2 mx-auto py-2 items-center w-[310px] md:w-[360px]">
                <Image
                src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1688970909/${userProfile}`}
                className="w-10 h-10 rounded-full" alt='userImage' width={100} height={100}
                />
                <h5 className="text-white text-lg font-serif">{firstName} {lastName}</h5>
            </span>
            <div className=" bg-white h-max w-[320px] md:w-[360px] border border-black">
                <Image
                src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1687762741/${image}`} className="md:w-[300px] w-[270px] h-96 mx-auto mt-[25px] md:mt-[30px]" alt ='Image' width={500} height={500} />
                <p className={` ${kst.className} md:w-[300px] w-[260px] mx-auto py-3 md:py-5 flex justify-center items-center overflow-scroll `}>
                  {caption}
                </p>
            </div>
              <button className= {`font-serif rounded-b-md flex justify-center items-center flex-grow py-3 hover:text-[#F8C732] text-white  transition duration-300 bg-[#58b8e8] text-2xl w-[360px] md:w-[400px]  focus:outline-[#F8C732] `}
             onClick={() => {toggleLiking()}}
            >
                Like {like}
            </button>
        </section>
        </section>
      }
          
    </>
  )
}
