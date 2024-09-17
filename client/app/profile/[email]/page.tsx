import React from 'react'
import Sidebar from '@/app/Components/Sidebar'
import { Button } from "@/app/Components/ui/button"
import PersonalPost from '@/app/Components/PersonalPost'
import { Input } from "@/app/Components/ui/input"
import { Label } from "@/app/Components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter
} from "@/app/Components/ui/dialog"
import Insta from '@/app/Icons/Insta'
import Linkedin from '@/app/Icons/Linkedin'
import Github from '@/app/Icons/Github'
// import AddSocial from '@/app/Components/AddSocial'
import Social from '@/app/Components/Social'

type Params = {
  params: {
    email: string
  }
}

let backendURL = process.env.BACKEND

async function getData(email: string) {
  const res = await fetch(`${backendURL}/data/${email}`);
  return res.json()
}

async function getPostData(email: string) {
  const res = await fetch(`${backendURL}/personalPosts/${email}`);
  return res.json();
}


export default async function Profile({ params: { email } }: Params) {
  const data = await getData(email);
  const post = await getPostData(email);

  return (
    <>
      <section className=' w-screen h-screen bg-[#F8F8F8] flex overflow-hidden'>
        <div className='p-4 border-r-4 border-black'>
          <Sidebar email={email} />
          <Social email={email} />
        </div>
        <div className='col-span-3'>
          <div className="mx-6 bg-[url('/cover.jpeg')] bg-no-repeat bg-cover mt-6 w-[79vw] h-48 rounded-lg overflow-hidden">
            <div className="flex justify-center items-center md:rounded-ld overflow-hidden md:px-10 py-5 bg-blur backdrop-filter backdrop-blur-md w-full gap-2 md:gap-10 h-48">
              <img src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1688970909/${data.profileImage}`} className="object-cover border-4 border-white h-40 w-40 rounded-full shadow-md bg-red-500" />
              <div className="flex md:flex-1 flex-col justify-center gap-4">
                <div className="flex justify-between items-center gap-5 ">
                  <div>
                    <h3 className=' text-white text-3xl'>{data.firstName} {data.lastName}</h3>
                    <h6 className=' text-white text-[10px]'>{data.email}</h6>
                  </div>
                  <div className='h-48 w-40 justify-center items-center flex flex-col gap-4'>
                    <Button size={'default'} variant="outline">Edit Profile</Button>
                    {/*<AddSocial email={email}/>*/}
                  </div>
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
                <PersonalPost key={post?.image} src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1688970909/${post?.image}`} title={post?.caption} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
