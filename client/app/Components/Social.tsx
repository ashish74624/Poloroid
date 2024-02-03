'use client'
import React ,{useEffect, useState} from 'react'
import Insta from '../Icons/Insta';
import Linkedin from '../Icons/Linkedin';
import Github from '../Icons/Github';
import Link from 'next/link';

let backendURL = process.env.BACKEND 

export default function Social({email}:any) {
    const [insta,setInsta]:any= useState("");
    const [linkedin,setLinkedin]:any= useState("");
    const [github,setGithub]:any= useState("");
    useEffect(()=>{
        const getSocials= async(email:any)=>{
            const res= await fetch(`${backendURL}/social/getSocials/${email}`);
            const data = await res.json();
            // console.log(data.social)
            setInsta(data.social.instagram);
            setLinkedin(data.social.linkedin);
            setGithub(data.social.github);
        }   
        getSocials(email)
    },[email])
    // console.log(social);
  return (
    <div className='mt-4 w-[231px] border-4 border-slate-500 h-96 rounded-lg'>
        <h3 className='pt-2 pl-2 text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600'>
            Socials 
        </h3>
        <div className='h-80 w-[210px] flex items-center flex-col gap-y-4 mx-auto mt-2'>
            {github.length>0 
            ?
            <a className='w-full transition-all duration-200 hover:bg-gray-300 rounded-lg ' target='_blank' href={github}>
                <p className='flex gap-x-2 h-max items-end w-full transition-all duration-200 hover:bg-gray-300 pl-1 py-2 text-2xl font-bold text-gray-700 rounded-lg'>
                    <Github width="32px" height="32px"/> Github
                </p>
            </a>
            :
            <p className='flex gap-x-2 h-max items-end w-full transition-all duration-200 hover:bg-gray-300 pl-1 py-2 text-2xl font-bold cursor-not-allowed text-gray-700 rounded-lg'>
                <Github width="32px" height="32px"/> Github
            </p>}
            {linkedin.length>0
            ?
            <a className='w-full transition-all duration-200 hover:bg-gray-300 rounded-lg ' target='_blank' href={linkedin}>
                <p className='flex gap-x-2 h-max items-end w-full transition-all duration-200 hover:bg-gray-300 pl-1 py-2 text-2xl font-bold text-gray-700 rounded-lg'>
                <Linkedin width="32px" height="32px"/> Linkedin
            </p>
            </a>
            :
            <p className='flex gap-x-2 h-max items-end w-full transition-all duration-200 hover:bg-gray-300 pl-1 py-2 text-2xl font-bold text-gray-700 cursor-not-allowed rounded-lg'>
                <Linkedin width="32px" height="32px"/> Linkedin
            </p>
            }
            {insta.length>0
            ?
            <a className='w-full transition-all duration-200 hover:bg-gray-300 rounded-lg ' target='_blank' href={insta}>
                <p className='flex gap-x-2 h-max items-end w-full transition-all duration-200 hover:bg-gray-300 pl-1 py-2 text-2xl font-bold text-gray-700 rounded-lg'>
                <Insta width="32px" height="32px"/> Instagram
            </p>
            </a>
            :
            <p className='flex gap-x-2 h-max items-end w-full transition-all duration-200 hover:bg-gray-300 pl-1 py-2 text-2xl font-bold cursor-not-allowed text-gray-700 rounded-lg'>
                <Insta width="32px" height="32px"/> Instagram
            </p>
            }
            
        </div>
    </div>
  )
}
