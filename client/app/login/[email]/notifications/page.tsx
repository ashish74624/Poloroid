import React, { Suspense } from 'react'
import Navbar from '../../../Components/Navbar';
import userDefaultImage from '@/public/userDefaultImage.webp'
import Sidebar from '../../../Components/Sidebar';
import NotfCard from '@/app/Components/NotfCard';
import NotfSkel from '@/app/Components/NotfSkel';

type Params={
  params:{
    email:string
  }
}


export default async function Notifications({params:{email}}:Params) {
    
  const res = await fetch(`http://localhost:3001/notifications/${email}`);
  const notification = await res.json();

  return (
    <section className=' h-screen w-screen bg-[#F8F8F8]'>
      <Navbar navData={false}/>
      <div className='mt-16'>
      <Sidebar home={'bg-opacity-60'} notifications={'bg-opacity-100'} email={email}/>
      </div>
      <div className='ml-[19vw] w-[50vw] '>
        <Suspense fallback={<NotfSkel/>}>
          {
            notification.sender?(
            <>
              <NotfCard friendName={notification.sender.name} friendImage={notification.sender.profileImage || userDefaultImage}/>
            </>
            )
            :
            (
            <>
              <div className='mt-4 w-[45vw] h-[85vh] rounded-lg bg-white shadow flex justify-center items-center'>
                No Notifications at the Moment 
            </div>
            </>
            )
            

          }
        </Suspense>
      </div>
    </section>
  )
}
