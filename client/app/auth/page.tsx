import React from 'react'
import { EB_Garamond } from 'next/font/google'
import Poster from '../Components/Poster'
import Form from '../Components/Form'

const ebgmd = EB_Garamond({
  subsets: ['greek-ext'],
  weight: '500',

})



export default function Auth() {


  return (
    <>
     <main className='flex bg-[#ECE3E1]'>
        <Poster/>
        <section className=' flex flex-col w-[55vw] h-screen items-center mt-16 space-y-10'>
          <div className='flex flex-col space-y-6'>
              <h2 className={`${ebgmd.className} text-4xl text-purple-400`}>Create Account</h2>
          </div>

        <Form/>  
        </section>
     </main> 
    </>
  )
}
