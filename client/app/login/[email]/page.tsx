
import React, { Suspense } from 'react'
import Navbar from '@/app/Components/Navbar';
import Sidebar from '@/app/Components/Sidebar';
import Post from '@/app/Components/Post';
import userDefaultImage from '@/public/userDefaultImage.webp'
import PostSkel from '@/app/Components/PostSkel';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

async function getUserData(email:string):Promise<UserData>{
  const res = await fetch(`http://localhost:3001/data/${email}`);
  return res.json()
}
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
    const userData = await getUserData(email);
    
  return (
    <>
      <main className='relative w-screen h-screen'>
      <section className="bg-[#F8F8F8] pb-10 w-screen h-screen overflow-y-scroll overflow-x-hidden mt-16">
        <Navbar userImg={userData.profileImage || userDefaultImage} firstName={userData.firstName || 'Hello'} lastName={userData.lastName} email={userData.email} />
        <section className="flex">
          <Sidebar />
          <div className="w-[50vw] flex flex-col items-center ml-[19vw]">
            <Suspense fallback={<PostSkel/>}>
              <Post userImg={userData.profileImage || userDefaultImage} email={email}/>
            </Suspense>
          </div>
        </section> 
      </section>
      </main>
    </>
  )
}
