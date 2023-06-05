import React from 'react'
import Navbar from '../Navbar'
import Form from './Form.tsx'

export default function LogInPage() {
  return (
    <>
      <Navbar login={false}/>
      <div className='bg-[#E9FF99] h-screen w-screen'>
      <Form/>
      </div>
{/*       
<form className='w-screen flex justify-center'>
  <main className='w-[50vw]'>
    <h2 className='text-[33px] font-semibold pb-5 flex w-full justify-center'>Welcome back to Stay, where your story continues</h2>
    <h2 className='text-[25px] font-semibold pb-5'>Login</h2>
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-xl font-medium text-gray-900">
      Enter email
    </label>
    <input type="email"
      id="email"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="name@email.com"
      required
    />
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-xl font-medium text-gray-900">
      Enter Password
    </label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" required/>
  </div>
  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
    Submit
  </button>
  <div className='pt-4'>
  <a href="/register" className=' text-green-500 hover:underline hover:underline-offset-1'>don't have an account yet click here</a>
  </div>
  </main>
</form> */}

    </>
  )
}
