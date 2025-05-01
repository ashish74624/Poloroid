import Navbar from '@/app/Components/Navbar'
import React from 'react'
import Link from 'next/link'
import LeftArrow from '@/app/Icons/LeftArrow'
import Image from 'next/image'
import BottomNav from '@/app/Components/BottomNav'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/Components/ui/card'

export const metadata: Metadata = {
    title: 'Poloroid | Friends',
    description: 'Your Friends '
}


type Params = {
    params: {
        email: string
    }
}

let backendURL = process.env.BACKEND

export default async function Friends({ params: { email } }: Params) {
    const res = await fetch(`${backendURL}/user/friends/${email}`, { cache: 'no-store' });
    const data = await res.json();
    email = decodeURIComponent(email)
    if (res.ok) {
        if (data.msg === 'Nofriends') {
            return (
                <>
                    <Navbar email={email} navData={false} />
                    <span className='text-gray-800 mx-auto py-2 bg-white rounded-full font-mono w-[95vw] md:w-[80vw] lg:w-[60vw] flex justify-between px-6 items-center border border-gray-300  shadow '>
                        <h1 className='text-2xl md:text-3xl'>Friends</h1>
                        <Link className=' focus:outline-none ' href={`/home/${email}`}>
                            <button className='bg-gray-700 transition-all duration-200 hover:bg-slate-400 flex h-max items-center text-white text-xl rounded-full pl-3 pr-4 py-2 focus:outline-8 focus:outline-slate-400 active:outline-8 active:bg-white active:outline-black active:text-black'>
                                <LeftArrow /> Home
                            </button>
                        </Link>
                    </span>
                    <section className='h-[91vh] w-screen bg-[#F8F8F8] flex justify-center items-center'>
                        You have No friends yet
                    </section>
                </>
            )
        }
        let friends = data.friends;
        return (
            <main className='w-full overflow-y-scroll flex flex-col justify-center gap-3 items-center pt-6'>
                {
                    friends.map((friend: any) => (
                            <Card key={friend._id}>
                                <CardContent className='flex gap-4 w-[95vw] md:w-[65vw] lg:w-[40vw] items-center my-auto h-max py-2 px-4 overflow-x-auto'>
                                    <span className=''>
                                        <Image className='w-9 h-9 md:w-11 md:h-11 rounded-full' src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v1687762741/${friend.profileImage}`}
                                            alt='Notification' height={100} width={100} />
                                    </span>
                                    <span className='flex '>
                                        <p className=' text-[#F8C732] font-bold text-sm md:text-base '>
                                            {friend.firstName} {friend.lastName}
                                        </p>
                                        <p className='ml-2 text-sm md:text-base'>| {friend.email}</p>
                                    </span>
                                </CardContent>
                            </Card>
                      


                    ))
                }
                <div className='md:hidden block'>
                    <BottomNav email={email} />
                </div>
            </main>
        )
    }

}
