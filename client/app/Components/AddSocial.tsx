'use client'

import React ,{useState} from 'react'
import { Input } from "@/app/Components/ui/input"
import { Label } from "@/app/Components/ui/label"
import { Button } from "@/app/Components/ui/button"
import Insta from '../Icons/Insta'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter
} from "@/app/Components/ui/dialog"
import Github from '../Icons/Github'
import Linkedin from '../Icons/Linkedin'
import toast , {Toaster}  from 'react-hot-toast'
import { useRouter } from 'next/navigation'

let backendURL = process.env.BACKEND 

interface SocialType {
    email:string
}

export default function AddSocial({email}:SocialType) {
    const rounter = useRouter();
    const [instagram,setInstagram] = useState('');
    const [linkedin,setLinkedin] = useState('');
    const [github,setGithub] = useState('');

    const handleSocial = async(email:string,instagram:string,linkedin:string,github:string)=>{
        const res = await fetch(`${backendURL}/social/${email}`,{
          method:'PUT',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify({instagram,linkedin,github})
        });
        const data:any = await res.json;
        if(data.done){
            toast.success('Socials Added');
            setTimeout(()=>{
                rounter.refresh();
            },100);
        }else{
            toast.error('Unsuccesful');
        }
      }


  return (
    <>
    <Dialog>
    <DialogTrigger>
      <Button size={'default'} variant="outline">Add Socials</Button>
    </DialogTrigger>
    <DialogContent className='border-[#58b8e8]'>
      <form onSubmit={()=>{handleSocial(email,instagram,linkedin,github)}}>
        <Label className='flex gap-1 mb-2' htmlFor="email"><Insta width='16px' height="16px"/> Instagram</Label>
        <Input onChange={(e)=>{setInstagram(e.target.value)}} className='mb-4' type="text" id="instagram" placeholder="" />
        <Label className='flex gap-1 mb-2' htmlFor="email"><Linkedin width='16px' height="16px"/> Linkedin</Label>
        <Input onChange={(e)=>{setLinkedin(e.target.value)}} className='mb-4' type="text" id="linkedin" placeholder="" />
        <Label className='flex gap-1 mb-2' htmlFor="email"><Github width='16px' height="16px" /> Github</Label>
        <Input onChange={(e)=>{setGithub(e.target.value)}} className='mb-4' type="text" id="github" placeholder="" />
        <DialogFooter>
          <button className='bg-[#58b8e8] text-white w-full h-10 rounded-lg' type='submit'>
            Add
          </button>
        </DialogFooter>
      </form>  
    </DialogContent>
    </Dialog>
    <Toaster />
    </>
  )
}
