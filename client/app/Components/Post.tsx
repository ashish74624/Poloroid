'use client'

import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import convertToBase64 from '../lib/convertToBase64'


export default function Post({userImg,userEmail,userFirstName,userLastName}:any) {

    const [file, setFile] = useState('');
    const [caption,setCaption] = useState('');

    const handleImageSelect = async(event:any) => {
        const base64 = await convertToBase64(event.target.files[0]);
        setFile(base64 as string);
        };

    const postData= async()=>{
        const res = await fetch('http://localhost:3001/post',{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: userFirstName,
                lastName:userLastName, 
                email : userEmail,
                caption,
                file
            })
        })

        const data = await res.json()
        if(data.status === 'ok'){
            // alert("Post Success")
            setCaption('')
            setFile('')
            
        }

    }

  return (
    <>
      
    </>
  )
}
