'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Kaushan_Script } from 'next/font/google';

let backendURL = process.env.BACKEND

const kst = Kaushan_Script({
    subsets:['latin'],
    weight:'400'
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

    const [debounced,setDebounced] = useState(false);

    const debouncing = (func: any, delay: number) => {
      let timer: ReturnType<typeof setTimeout>;
      return function (this: any, ...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    };

    const handleLike=  debouncing(async (id: any) => {
      const response = await fetch(`${backendURL}/like/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOfUser: email,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.msg === 'liked') {
          setLike((prev: number) => prev + 1);
        }
        if (data.msg === 'disliked') {
          setLike((prev: number) => prev - 1);
        }
      } else {
        setLike(like);
      }
    }, 1000); // Debounce delay of 1000ms (1 second)
        
    
  return (
    <>
          <section className='md:pb-0 pb-16'>
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
                <p className={` ${kst.className} md:w-[300px] w-[260px] mx-auto py-3 md:py-5 flex justify-center items-center`}>
                  {caption}
                </p>
            </div>
              <button className= {`font-serif rounded-b-md flex justify-center items-center flex-grow py-3 hover:text-[#F8C732] text-white  transition duration-300 bg-[#58b8e8] text-2xl w-[360px] md:w-[400px]  focus:outline-[#F8C732] `}
             onClick={() => handleLike(id)}
            >
                Like {like}
            </button>
        </section>
        </section>
    </>
  )
}
