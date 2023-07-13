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

export default function Post({userImg,email}:any) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        if (email) {
          const response = await fetch(`http://localhost:3001/allPost/${email}`);
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
      const response = await fetch(`http://localhost:3001/like/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOfUser: email
        })
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === updatedPost.post._id ? updatedPost.post : post
          )
        );
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
        <>
          {posts.map((post) => (
            <div className="my-5" key={post._id}>
              <div className="bg-[#58b8e8] w-max h-max px-6 pt-3 pb-4 rounded-t">
                <div className="flex space-x-3 mb-4">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1688970909/${post.userProfile}`}
                    alt="User Profile"
                    width={100}
                    height={100}
                  />
                  <p className="text-white mb-1 hover:underline cursor-pointer w-max">
                    {post.firstName || 'John'} {post.lastName || 'Doe'}
                  </p>
                </div>
                <div className="relative w-[22vw] h-[58vh] px-6 pt-5 flex flex-col items-center bg-white border border-[#1d1d1f] shadow-xl">
                  <img
                    className="w-[297px] h-[347px] overflow-hidden"
                    src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1687762741/${post.image}`}

                    alt="Hello"
                    width={100}
                    height={100}
                  />
                  <div className="">
                    <p className={`${ks.className} w-[21.8vw] h-16 px-4 bg-white flex justify-center items-center`}>
                      {post.caption}
                    </p>
                  </div>
                </div>
              </div>
              <button
                className={`${No.className} text-3xl w-[386px] rounded-b py-1 h-max text-white bg-[#58b8e8]  hover:text-[#F8C732] transition duration-300`}
                onClick={() => handleLike(post._id)}
              >
                Like {post.likes}
              </button>
            </div>
          ))}
        </>
      )}
    </>
  );
};

