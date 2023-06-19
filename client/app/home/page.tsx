'use client'

import React, { useState, useEffect } from 'react';
import getToken from '../lib/getToken';
import jwt from 'jsonwebtoken';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import Image from 'next/image';
import Post from '../Components/Post';

interface Post {
  _id: string;
  firstName:string;
  lastName:string;
  caption: string;
  image: string;
  email: string;
}

export default function Home() {
  let token = getToken();
  if (!token) {
    return (
      <>
        <main className="h-screen w-screen flex flex-col justify-center items-center">
          Loading...
        </main>
      </>
    );
  }

  const data = jwt.decode(token);
  if (typeof data === 'object' && data !== null) {
    const [posts, setPosts] = useState<Post[]>([]);

    const email = data.email;
    const firstName= data.firstName;
    const lastName= data.lastName;

    useEffect(() => {
      const getPosts = async () => {
        try {
          const response = await fetch(`http://localhost:3001/posts/${email}`);
          const articles = await response.json();
          setPosts(articles);
        } catch (error) {
          console.log(error);
        }
      };

      getPosts();
    }, []);

    const userImg = data.profileImage;

    return (
      <main className='relative w-screen h-screen'>
      <section className="bg-[#F8F8F8] pb-10 w-screen h-screen overflow-y-scroll overflow-x-hidden mt-16">
        <Navbar userImg={userImg} firstName={firstName} lastName={lastName} email={email} />
        <section className="flex">
          <Sidebar />
          <div className="w-[50vw] flex flex-col items-center ml-[19vw]">
            <Post id={'1'} firstName={'Ashish'} lastName={'Kumar'} image={userImg} caption='Summer 2015' />
            {/* {posts.map((post) => (
              <div
                key={post._id}
                className="w-[30vw] h-max bg-[#f5f5f7] rounded-xl flex flex-col my-4"
              >
                <button className="bg-blue-100 hover:bg-blue-200 text-blue-500 w-full flex justify-center rounded-t-xl items-center font-light h-12 mb-7">
                  {post.firstName || 'John'} {post.lastName || 'Doe'}
                </button>
                <span className="w-[30vw] flex flex-col items-center">
                  <div className="w-[22vw] border-[#1d1d1f] border shadow-xl">
                    <Image
                      className="w-[22vw] h-[45vh]"
                      unoptimized={true}
                      src={post.image}
                      alt="hello"
                      width={100}
                      height={100}
                    />
                    <caption className="px-1 w-[21.9vw] h-16 flex justify-center items-center bg-[#f7f5f3]">
                      {post.caption}
                    </caption>
                  </div>
                </span>
                <button className="text-red-500 bg-red-200 hover:bg-red-300 w-full h-10 mt-7 rounded-b-xl">
                  Like
                </button>
              </div>
            ))} */}
          </div>
        </section>
      </section>
      </main>
    );
  }

}
