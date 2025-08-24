'use client'
import React, { Suspense } from 'react';
import userDefaultImage from '@/public/userDefaultImage.webp';
import NotfCard from '@/app/Components/NotfCard';
import NotfSkel from '@/app/Skels/NotfSkel';


type Params = {
  params: {
    email: string;
  };
};

const backendURL = process.env.BACKEND;

export default async function Notifications({ params: { email } }: Params) {

  const res = await fetch(`${backendURL}notification/notifications/${decodeURIComponent(email)}/`, { cache: 'no-store' });
  const data = await res.json();


  const renderNotifications = (notifications: any[]) => (
    <Suspense fallback={<NotfSkel />}>
      {notifications.map((data: any) => (
        <NotfCard
          key={data.id}
          friendID={data.friend_id}
          email={decodeURIComponent(email)}
          friendName={data.first_name}
          friendImage={data.profile_image || userDefaultImage}
        />
      ))}
    </Suspense>
  );

  if (data.status === 'ok') {
    const notifications = data.notifications;
    return (
      <section className="py-6">
        <div className='w-full grid place-content-center'>
          <h1 className='text-2xl md:text-3xl w-max mx-auto'>Notifications</h1>
        </div>
        <div className="flex flex-col items-center gap-4">
          {notifications.length > 0 ? (
            renderNotifications(notifications)
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              You currently have no notifications.
            </div>
          )}
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <div className="h-full w-full flex justify-center items-center">
          Error fetching notifications.
        </div>
      </section>
    );
  }
}
