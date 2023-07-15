import Navbar from '@/app/Components/Navbar'
import React from 'react'

type Params={
    params:{
        email:string,
    }
}

export default function FAQ({params:{email}}:Params) {
  return (
    <>
    <Navbar email={email} navData={false}/>
     <section className='w-screen h-[91vh] overflow-y-scroll overflow-x-hidden bg-[#F8F8F8] flex justify-center '>

     
<div className='w-[80vw] pt-2 pb-5' id="accordion-collapse" data-accordion="collapse">
  <h2 id="accordion-collapse-heading-1">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200  hover:bg-gray-100 " data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
      <span> How do I create an account on Poloroid?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-1" className="" aria-labelledby="accordion-collapse-heading-1">
    <div className="p-5 border border-b-0 border-gray-200">
      <p className="mb-2 text-gray-500">To create an account on Poloroid, click on the "Sign Up" button on the homepage. Fill in your first name, last name, email address, and location. Follow the prompts to complete the registration process.</p>
    </div>
  </div>
  <h2 id="accordion-collapse-heading-2">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 " data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
      <span> Can I log in to Poloroid using my email?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-2" className="" aria-labelledby="accordion-collapse-heading-2">
    <div className="p-5 border border-b-0 border-gray-200 ">
      <p className="mb-2 text-gray-500 ">Yes, you can log in to Poloroid using the email address you provided during the registration process. Simply click on the "Log In" button and enter your registered email address and password.</p>
    </div>
  </div>
  <h2 id="accordion-collapse-heading-3">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 " data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
      <span> How do I upload pictures to Poloroid?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-3" className="" aria-labelledby="accordion-collapse-heading-3">
    <div className="p-5 border border-t-0 border-gray-200 ">
      <p className="mb-2 text-gray-500 ">To upload pictures to Poloroid, log in to your account and click on the "Plus sign" button. Choose the image you want to upload from your device and add a caption if desired. Then, click on the "Post" button to share it with your friends and followers.</p>
    </div>
  </div>
  <h2 id="accordion-collapse-heading-3">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 " data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
      <span>Can my friends see my posts?</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-collapse-body-3" className="mb-4" aria-labelledby="accordion-collapse-heading-3">
    <div className="p-5 border border-t-0 border-gray-200 ">
      <p className="mb-2 text-gray-500 ">Yes, your friends on Poloroid will be able to see the posts you share. When you upload a picture and add a caption, it will appear in the feed of your friends. They can like your posts and leave comments as well.</p>
    </div>
  </div>
</div>
 </section>
    </>
  )
}
