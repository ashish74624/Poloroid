import React, { Suspense } from 'react'
import Navbar from '@/app/Components/Navbar';
import userDefaultImage from '@/public/userDefaultImage.webp'
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
    if(notification.length!==0){
    return (
      <section className=' h-screen w-screen bg-[#F8F8F8]'>
        <Navbar email={email} navData={false}/>
        <div className='w-screen flex flex-col items-center'>
        <h1 className='text-gray-800 text-3xl font-mono'>Notifications</h1>
          <Suspense fallback={<NotfSkel/>}>
            {
                notification.map((data:any)=>(
                  <>
                  <NotfCard friendID={data.sender.id} email={email} friendName={data.sender.name} friendImage={data.sender.profilePicture || userDefaultImage}/>
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
        <Navbar email={email} navData={false}/>
          <div className='w-screen h-[70vh] flex justify-center items-center'>
            You Currently have no Notifications
          </div>
        </section>
      </>
    )
  }
  
}
else{
  return(
    <>
      <section className=' h-screen w-screen bg-[#F8F8F8]'>
      <Navbar email={email} navData={false}/>
        <div className='w-screen h-[70vh] flex justify-center items-center'>
          You Currently have no Notifications
        </div>
      </section>
    </>
  )
}

  }