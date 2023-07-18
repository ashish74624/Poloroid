'use client'

import React, { useState, useEffect } from 'react';
import PostSkel from './PostSkel';
import { Kaushan_Script } from 'next/font/google';
import { Nixie_One } from 'next/font/google';

const ks = Kaushan_Script({
  subsets:['latin'],
  weight:'400'
})

const No = Nixie_One({
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

interface Props {
  userImg: string;
  email: string;
}

let backendURL = process.env.BACKEND || 'http://localhost:3001'

export default function Post({userImg,email}:any) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        if (email) {
          const response = await fetch(`${backendURL}/allPost/${email}`);
          const articles = await response.json();
          setPosts(articles);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, [email]);

  const handleLike = async (id: string) => {
    try {
      const response = await fetch(`${backendURL}/like/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOfUser: email
        })
      });
      const data = await response.json();
      if (response.ok) {
        const updatedPosts = posts.map((post) => {
          if (post._id === id) {
            if(data.msg==='liked'){
              return {
                ...post,// the spread syntax is used to create another array
                likes: post.likes+1 // the 'likes' part of the post is changed and then this modified post is returned in the form of updatedPosts
              }
            }
            else if(data.msg==='disliked'){
              return {
                ...post,
                likes: post.likes-1
              }
            }
            
          }
          return post;
        });
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <PostSkel />
      ) : (
        <section className='md:pb-0 pb-16'>
          {posts.map((post) => (
            <section key={post._id} className="bg-[#58b8e8] w-[360px] my-2 md:w-[400px] h-max flex flex-col rounded-md  items-center">
            <span className="flex space-x-2 mx-auto py-2 items-center w-[310px] md:w-[360px]">
                <img
                src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1688970909/${post.userProfile}`}
                className="w-10 h-10 rounded-full" />
                <h5 className="text-white text-lg">{post.firstName} {post.lastName}</h5>
            </span>
            <div className=" bg-white h-max w-[320px] md:w-[360px] border border-black">
                <img 
                src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1687762741/${post.image}`} className="md:w-[300px] w-[270px] h-96 mx-auto mt-[25px] md:mt-[30px]" />
                <p className={` ${ks.className} md:w-[300px] w-[260px] mx-auto py-3 md:py-5 flex justify-center items-center`}>
                  {post.caption}
                </p>
            </div>
            <button className={` ${No.className} rounded-b-md flex justify-center items-center flex-grow py-3 hover:text-[#F8C732] text-white transition duration-300 bg-[#58b8e8] text-2xl w-[360px] md:w-[400px]`}
             onClick={() => handleLike(post._id)}
            >
                Like {post.likes}
            </button>
        </section>
          ))}
        </section>
      )}
    </>
  );
};
