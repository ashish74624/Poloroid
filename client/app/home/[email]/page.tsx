import React, { Suspense } from 'react'
import Navbar from '@/app/Components/Navbar';
import Sidebar from '@/app/Components/Sidebar';
import PostSkel from '@/app/Skels/PostSkel';
import Post from '@/app/Components/Post';
import RightSidebar from '@/app/Components/RightSidebar';
import BottomNav from '@/app/Components/BottomNav';
import UserCard from '@/app/Components/UserCard';
import { Metadata } from 'next';


export async function generateMetadata({ params: { email } }: Params): Promise<Metadata> {
  const res = getData(email);
  const data = await res;
  return {
    title: `Poloroid | ${data.firstName} ${data.lastName}'s Profile`,
    description: "View and interact with your Poloroid profile.",
  }
}

interface Post {
  _id: string;
  firstName: string;
  lastName: string;
  caption: string;
  image: string;
  email: string;
}


type Params = {
  params: {
    email: string,
  }
}

let backendURL = process.env.BACKEND

async function getData(email: string) {
  const res = await fetch(`${backendURL}/user/data/${email}`);
  return res.json()
}


async function getFriendSuggestions(email: string) {
  const res = await fetch(`${backendURL}/user/getFriendSuggestions/${email}`, { cache: 'no-store' });
  return res.json()
}

async function getAllPost(email: string) {
  const res = await fetch(`${backendURL}/post/allPost/${email}`);
  return res.json();
}

export default async function Home({ params: { email } }: Params) {

  const userData = await getData(email);
  const rightSideBarData = await getFriendSuggestions(email);
  const post = getAllPost(email);




  return (
    <main className='h-screen  overflow-hidden'>
      <section className='h-full overflow-y-scroll md:overflow-hidden flex justify-between mb-14 md:mb-0 '>
        <div className=' md:col-span-3  w-full  md:overflow-x-hidden md:overflow-y-scroll flex flex-col items-center '>
          <Suspense fallback={<PostSkel />}>
            <Post promise={post} email={email} userId={userData._id} />
          </Suspense>
        </div>
        <div className='lg:block hidden border-l border-borderColor px-4 overflow-x-hidden overflow-y-scroll w-[30%] '>
          <h3 className='w-full mb-2 mt-3  text-center'>People you may know</h3>
          {rightSideBarData.map((rightSideBarData: any) => (
            <div key={rightSideBarData._id}>
              <RightSidebar profileImage={rightSideBarData.profileImage} id={rightSideBarData._id} email={userData.email} firstName={rightSideBarData.firstName} lastName={rightSideBarData.lastName} />
            </div>
          ))}
        </div>
      </section>
      <div className='md:hidden inline'>
        <BottomNav email={userData.email} firstName={userData.firstName} lastName={userData.lastName} />
      </div>
    </main>
  )
}
