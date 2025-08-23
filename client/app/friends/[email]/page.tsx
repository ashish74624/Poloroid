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
    const res = await fetch(`${backendURL}user/friends/${decodeURIComponent(email)}/`, { cache: 'no-store' });
    const data = await res.json();
    console.log("data FRIENDS",data)
    email = decodeURIComponent(email)
    if (res.ok) {
        if (data.friends.length === 0) {
            return (
                <>
                    <h1 className='text-2xl md:text-3xl'>Friends</h1>
                    <section className='h-[91vh] w-screen bg-[#F8F8F8] flex justify-center items-center'>
                        You have No friends yet
                    </section>
                </>
            )
        }
        let friends = data.friends;
        return (
            <main className='w-full overflow-y-scroll flex flex-col justify-center gap-3 items-center pt-6'>
                <h1 className='text-2xl md:text-3xl'>Friends</h1>
                {
                    friends.map((friend: any) => (
                        <Card key={friend.id}>
                            <CardContent className='flex gap-4 w-[90vw] md:w-[60vw] lg:w-[40vw] items-center my-auto h-max py-2 px-4 overflow-x-auto'>
                                <span className=''>
                                    <Image className='w-9 h-9 md:w-11 md:h-11 rounded-full'
                                        src={`${friend.profile_image}`}
                                        alt='Notification' height={100} width={100} />
                                </span>
                                <span className='flex '>
                                    <p className=' text-[#F8C732] font-bold text-sm md:text-base '>
                                        {friend.first_name} {friend.last_name}
                                    </p>
                                    <p className='ml-2 text-sm md:text-base'>| {friend.email}</p>
                                </span>
                            </CardContent>
                        </Card>
                    ))
                }
            </main>
        )
    }

}
