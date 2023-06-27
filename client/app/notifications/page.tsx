'use client'
import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar';
import userDefaultImage from '@/public/userDefaultImage.webp'


export default function Notifications() {
    useEffect(()=>{
        async function getNotifications(email:String) {
            const res = await fetch(`http://loaclhost:3001/notifications/${email}`);
            const data = await res.json();
        }
    },[])
  return (
    <>
      <Navbar userImg={userDefaultImage} firstName={"Ashish kumar"} lastName='hell' email='hjdwgfjdws'/>
    </>
  )
}
