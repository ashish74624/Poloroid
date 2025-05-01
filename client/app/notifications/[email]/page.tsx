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
      <section className="py-6">
        <div className="flex flex-col items-center gap-4">
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
      <section>
        <Navbar email={email} navData={false} />
        <div className="h-full w-full flex justify-center items-center">
          Error fetching notifications.
        </div>
      </section>
    );
  }
}
