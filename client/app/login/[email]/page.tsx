
import React, { Suspense } from 'react'
import Navbar from '@/app/Components/Navbar';
import Sidebar from '@/app/Components/Sidebar';
import userDefaultImage from '@/public/userDefaultImage.webp'
import PostSkel from '@/app/Components/PostSkel';
import Post from '@/app/Components/Post';
import RightSidebar from '@/app/Components/RightSidebar';


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
  // const [posts, setPosts] = useState<Post[]>([]);
    const res = await fetch(`http://localhost:3001/data/${email}`);
    const userData = await res.json()
    console.log(userData.firstName)
    
  return (
    <>
    
      <main className='relative w-screen h-screen'>
      <section className="bg-[#F8F8F8] pb-10 w-screen h-screen overflow-y-scroll overflow-x-hidden mt-16">
        <Navbar userImg={userData.profileImage || userDefaultImage} firstName={userData.firstName || 'Hello'} lastName={userData.lastName} email={userData.email} />
        <section className="flex">
          <Sidebar />
          <div className="w-[50vw] flex flex-col items-center ml-[19vw]">
            <Suspense fallback={<PostSkel/>}>
              <Post userImg={userData.profileImage || userDefaultImage} email={userData.email}/>
            </Suspense>
          </div>
          <RightSidebar email={userData.email}/>
        </section> 
      </section>
      </main>
    </>
  )
}
