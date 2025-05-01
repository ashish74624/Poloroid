import React from 'react'
import Sidebar from '@/app/Components/Sidebar'
import { Button } from "@/app/Components/ui/button"
import PersonalPost from '@/app/Components/PersonalPost'
import Social from '@/app/Components/Social'
import { cloud_name } from '@/app/libs/configs'

type Params = {
  params: {
    email: string
  }
}

let backendURL = process.env.BACKEND

async function getData(email: string) {
  console.log(email)
  const res = await fetch(`${backendURL}/user/data/${decodeURIComponent(email)}`);
  return res.json()
}

async function getPostData(email: string) {
  const res = await fetch(`${backendURL}/post/personalPosts/${decodeURIComponent(email)}`);
  return res.json();
}


export default async function Profile({ params: { email } }: Params) {
  const data = await getData(email);
  const post = await getPostData(email);

  // const [data, post] = await Promise.all([userData, postData]);

  return (
    <section className='min-h-screen flex flex-col'>
      <div className="bg-[url('/cover.jpeg')] bg-no-repeat bg-cover w-full h-48 overflow-hidden">
        <div className="flex justify-center items-center md:rounded-ld overflow-hidden md:px-10 py-5 bg-blur backdrop-filter backdrop-blur-md w-full gap-2 lg:gap-10 h-48">
          <img loading='lazy' src={`${process.env.CLOUDINARY_URL}/${data.profileImage}`} className="object-cover border-4 border-white h-14 w-14 lg:h-40 lg:w-40 rounded-full shadow-md bg-gray-400" />
          <div className="flex md:flex-1 flex-col justify-center gap-4">
            <div className="flex justify-between items-center gap-5 ">
              <div>
                <h3 className=' text-white text-3xl'>{data.firstName} {data.lastName}</h3>
                <h6 className=' text-white text-[10px]'>{data.email}</h6>
              </div>
              <Social email={email} />
            </div>
          </div>
        </div>
      </div>
      {/* Posts */}
      <div className='w-full  flex-1'>
        <h2 className='p-2 text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600'>
          Posts
        </h2>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-content-center  gap-2'>
          {post.map((post: any) => (
            <div key={post?.image} className="flex justify-center">
              <PersonalPost
                src={`https://res.cloudinary.com/${cloud_name}/image/upload/v1688970909/${post?.image}`}
                title={post?.caption}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
