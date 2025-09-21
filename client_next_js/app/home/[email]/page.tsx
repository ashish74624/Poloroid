import React, { Suspense } from 'react'
import PostSkel from '@/app/Skels/PostSkel';
import Post from '@/app/Components/Post';
import { Metadata } from 'next';
import PeopleYMK from '@/app/Components/PeopleYMK';
import { getData } from '@/app/services/getUserData';
import { getFriendSuggestions } from '@/app/services/getFriendSuggestions';
import { getAllPost } from '@/app/services/getAllPost';


export async function generateMetadata({ params: { email } }: Params): Promise<Metadata> {
  const res = getData(email);
  const data = await res;
  return {
    title: `Poloroid | ${data.first_name} ${data.last_name}'s Profile`,
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


export default async function Home({ params: { email } }: Params) {

  const userData = await getData(email);
  const rightSideBarData = await getFriendSuggestions(email);

  return (
    <main className='h-screen  overflow-hidden'>
      <section className='h-full overflow-y-scroll md:overflow-hidden flex justify-between mb-14 md:mb-0 '>
        <div className=' md:col-span-3  w-full  md:overflow-x-hidden md:overflow-y-scroll flex flex-col items-center '>
          <Suspense fallback={<PostSkel />}>
            <Post email={decodeURIComponent(email)} />
          </Suspense>
        </div>
        <PeopleYMK rightSideBarData={rightSideBarData.suggestions} userData={userData} />
      </section>
    </main>
  )
}
