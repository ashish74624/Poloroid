
import React, { Suspense } from 'react'
import Navbar from '@/app/Components/Navbar';
import Sidebar from '@/app/Components/Sidebar';
import userDefaultImage from '@/public/userDefaultImage.webp'
import PostSkel from '@/app/Components/PostSkel';
import Post from '@/app/Components/Post';
import RightSidebar from '@/app/Components/RightSidebar';
import Lorem from '@/app/Components/Lorem';


interface Post {
    _id: string;
    firstName:string;
    lastName:string;
    caption: string;
    image: string;
    email: string;
  }


type Params={
    params:{
        email:string,
    }
}

export default async function Home({params:{email}}:Params) {
    const res = await fetch(`http://localhost:3001/data/${email}`);
    const userData = await res.json()
    
  return (
    <main className='h-screem w-screen overflow-hidden'>
      <nav>
        <Navbar userImg={userData.profileImage || userDefaultImage} firstName={userData.firstName || 'Hello'} lastName={userData.lastName} email={userData.email} navData={true} />
      </nav>
      <section className=' h-[91vh] w-screen grid grid-cols-5'>
        <div className=' border-r border-gray-600'><Sidebar email={userData.email}/></div>
        <div className=' col-span-3 overflow-x-hidden overflow-y-scroll flex flex-col items-center'>
            <Suspense fallback={<PostSkel/>}>
              <Post userImg={userData.profileImage || userDefaultImage} email={userData.email}/>
            </Suspense>
        </div>
        <div className='border-l border-gray-600 overflow-x-hidden overflow-y-scroll'><RightSidebar email={userData.email}/></div>
      </section>
    </main>
  )
}
