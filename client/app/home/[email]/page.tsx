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
    <main className='h-screem w-screen overflow-hidden'>
      <nav>
        <Navbar userImg={userData.profileImage} firstName={userData.firstName || 'User'} lastName={userData.lastName} email={userData.email} navData={true} />
      </nav>
      <section className=' h-[93vh] lg:h-[91vh] overflow-y-scroll md:overflow-hidden w-screen flex justify-center md:grid grid-cols-4 lg:grid-cols-5 mb-14 md:mb-0 '>
        <div className='h-[91vh] overflow-y-scroll  border-r border-gray-600 hidden md:block bg-[#F8F8F8]'>
          <Sidebar email={userData.email} />
          <div className='lg:hidden mt-3  border-black border-t flex flex-col items-center space-y-2 pt-2 '>
            <h1>People You may know</h1>
            <div className='space-y-2 '>
              {rightSideBarData.map((rightSideBarData: any, i: number) => (

                <UserCard key={i} profileImage={rightSideBarData.profileImage} id={rightSideBarData._id} emailOfUser={userData.email} firstName={rightSideBarData.firstName} lastName={rightSideBarData.lastName} />

              ))}
            </div>
          </div>
        </div>
        <div className=' md:col-span-3 bg-[#F8F8F8] w-full  md:overflow-x-hidden md:overflow-y-scroll flex flex-col items-center '>
          <Suspense fallback={<PostSkel />}>
            <Post promise={post} email={email} userId={userData._id} />
          </Suspense>
        </div>
        <div className='lg:block hidden border-l border-gray-600 bg-[#F8F8F8] overflow-x-hidden overflow-y-scroll'>
          <h3 className='text-xl mb-2 mt-3 mx-12'>People you may know</h3>
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
