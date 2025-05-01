import React, { Suspense } from 'react';
import Navbar from '@/app/Components/Navbar';
import userDefaultImage from '@/public/userDefaultImage.webp';
import NotfCard from '@/app/Components/NotfCard';
import NotfSkel from '@/app/Skels/NotfSkel';
import Link from 'next/link';
import LeftArrow from '@/app/Icons/LeftArrow';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Poloroid | Notifications',
  description: 'Your Notifications'
};

type Params = {
  params: {
    email: string;
  };
};

const backendURL = process.env.BACKEND;

export default async function Notifications({ params: { email } }: Params) {
  const res = await fetch(`${backendURL}/user/notifications/${email}`, { cache: 'no-store' });
  const data = await res.json();

  const NotificationsHeader = () => (
    <span className="text-gray-800 mx-auto h-14 bg-white rounded-md mt-2 font-mono w-[95vw] md:w-[80vw] lg:w-[60vw] flex justify-between px-6 items-center border border-gray-300 shadow">
      <h1 className="text-2xl md:text-3xl">Notifications</h1>
      <Link href={`/home/${email}`} className="focus:outline-none">
        <button className="bg-gray-700 transition-all duration-200 hover:bg-slate-400 flex h-max items-center text-white text-xl rounded-full pl-3 pr-4 py-2 focus:outline-8 focus:outline-slate-400 active:outline-8 active:bg-white active:outline-black active:text-black">
          <LeftArrow /> Home
        </button>
      </Link>
    </span>
  );

  const renderNotifications = (notifications: any[]) => (
    <Suspense fallback={<NotfSkel />}>
      {notifications.map((data: any) => (
        <NotfCard
          key={data.sender.id}
          friendID={data.sender.id}
          email={email}
          friendName={data.sender.name}
          friendImage={data.sender.profilePicture || userDefaultImage}
        />
      ))}
    </Suspense>
  );

  if (data.status === 'ok') {
    const notifications = data.msg;

    return (
      <section className="">
        <Navbar email={email} navData={false} />
        <div className="w-screen flex flex-col items-center">
          <NotificationsHeader />
          {notifications.length > 0 ? (
            renderNotifications(notifications)
          ) : (
            <div className="w-screen h-[70vh] flex justify-center items-center">
              You currently have no notifications.
            </div>
          )}
        </div>
      </section>
    );
  } else {
    return (
      <section className="h-screen w-screen bg-[#F8F8F8]">
        <Navbar email={email} navData={false} />
        <NotificationsHeader />
        <div className="w-screen h-[70vh] flex justify-center items-center">
          Error fetching notifications.
        </div>
      </section>
    );
  }
}
