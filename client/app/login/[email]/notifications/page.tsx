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
    
  const res = await fetch(`http://localhost:3001/notifications/${email}`,{cache:'no-store'});
  const data = await res.json();
  if(data.status==='ok'){
    const notification = data.msg;

    return (
      <section className=' h-screen w-screen bg-[#F8F8F8]'>
        <Navbar email={email} navData={false}/>
        <div className='w-screen flex flex-col items-center'>
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
      </section>
    )
  }
else{
  return(
    <>
      <section className=' h-screen w-screen bg-[#F8F8F8]'>
        <Navbar navData={false}/>
        <div className='ml-[19vw] w-[50vw] h-[75vh] flex justify-center items-center'>
          You Currently have no Notifications
        </div>
      </section>
    </>
  )
}

  }