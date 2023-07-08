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
  const data = await res.json();
  if(data.status==='ok'){
    const notification = data.msg;

    return (
      <main className='h-screem w-screen overflow-hidden'>
      <nav>
        <Navbar navData={false} />
      </nav>
      <section className=' h-[91vh] w-screen grid grid-cols-5'>
        <div className=' border-r border-gray-600'><Sidebar/></div>
        <div className=' col-span-3 overflow-x-hidden overflow-y-scroll flex flex-col items-center'>
        <Suspense fallback={<NotfSkel/>}>
            {
                notification.map((data:any)=>(
                  <>
                  <NotfCard friendName={data.sender.name} friendImage={data.sender.profilePicture || userDefaultImage}/>
                </>
                ))
            }    
          </Suspense>
        </div>
        <div className='overflow-hidden'></div>
      </section>
    </main>
    )
  }
else{
  return(
    <>
      <section className=' h-screen w-screen bg-[#F8F8F8]'>
        <Navbar navData={false}/>
        <div className='mt-16'>
        <Sidebar home={'bg-opacity-60'} notifications={'bg-opacity-100'} email={email}/>
        </div>
        <div className='ml-[19vw] w-[50vw] h-[75vh] flex justify-center items-center'>
          You Currently have no Notifications
        </div>
      </section>
    </>
  )
}

  }
 