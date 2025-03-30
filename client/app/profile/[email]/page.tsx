import React from 'react'
import Sidebar from '@/app/Components/Sidebar'
import { Button } from "@/app/Components/ui/button"
import PersonalPost from '@/app/Components/PersonalPost'
import Social from '@/app/Components/Social'
import { cloud_name } from '@/app/libs/configs'
import { Input } from '@/app/Components/ui/input'



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
    <>
      <section className=' w-screen h-screen bg-[#F8F8F8] flex overflow-hidden'>
        <div className='p-4 border-r-4 border-black'>
          <Sidebar email={email} />
          {/* <Social email={email} /> */}
        </div>
        <div className='col-span-3'>
          <div className="mx-6 bg-[url('/cover.jpeg')] bg-no-repeat bg-cover mt-6 w-[79vw] h-48 rounded-lg overflow-hidden">
            <div className="flex justify-center items-center md:rounded-ld overflow-hidden md:px-10 py-5 bg-blur backdrop-filter backdrop-blur-md w-full gap-2 md:gap-10 h-48">
              <img loading='lazy' src={`${process.env.CLOUDINARY_URL}/${data.profileImage}`} className="object-cover border-4 border-white h-40 w-40 rounded-full shadow-md bg-gray-400" />
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
          <div className='w-[79vw] border-4 border-slate-500 h-[450px] rounded-lg m-6'>
            <h2 className='p-2 text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600'>
              Posts
            </h2>
            <div className=' w-full h-96 grid grid-cols-4 pl-2 pb-2 mt-2 overflow-x-hidden overflow-y-scroll gap-3'>
              {post.map((post: any) => (
                <PersonalPost key={post?.image} src={`https://res.cloudinary.com/${cloud_name}/image/upload/v1688970909/${post?.image}`} title={post?.caption} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
