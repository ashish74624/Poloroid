import Navbar from '@/app/Components/Navbar'
import React from 'react'

type Params={
    params:{
      email:string
    }
  }

export default async function Friends({params:{email}}:Params) {
    const res = await fetch(`http://localhost:3001/friends/${email}`);
    const data = await res.json();
    if(res.ok){
        if(data.msg==='Nofriends'){
            return(
                <>
                    <Navbar email={email} navData={false}/>
                    <section className='h-[91vh] w-screen flex justify-center items-center'>
                        You have No friends
                    </section>
                </>
            )
        }
        let friends = data.friends;
        return (
            <>
              <Navbar email={email} navData={false}/>
              <section className='h-[91vh] bg-[#F8F8F8] w-screen flex flex-col items-center'>
                <h1 className='text-gray-800 text-3xl font-mono'>Friends</h1>
                {
                    friends.map((friend:any)=>(
                        <>
                        <div className='bg-white h-16 my-3 w-[95vw] md:w-[65vw] lg:w-[40vw] rounded-lg shadow flex items-center p-6 space-x-4'>
                            <span className=''>
                                <img className='w-9 h-9 md:w-11 md:h-11 rounded-full' src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1687762741/${friend.profileImage}`} alt='Notification' height={100} width={100}/>
                            </span>
                            <span className='flex '>
                                <p className=' text-[#F8C732] font-bold text-sm md:text-base '>
                                    {friend.firstName} {friend.lastName}
                                </p>
                                <p className='ml-2 text-sm md:text-base'>| {friend.email}</p>
                            </span>
               
                        </div>
                        </>
                    ))
                }
              </section>
            </>
          )
    }
  
}
