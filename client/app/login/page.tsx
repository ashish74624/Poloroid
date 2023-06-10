import React from 'react'
import { EB_Garamond } from 'next/font/google'
import Poster from '../Components/Poster'

const ebgmd = EB_Garamond({
  subsets: ['greek-ext'],
  weight: '500',

})

export default function page() {
  return (
       <main className='flex bg-[#ECE3E1]'>
        <Poster/>
        <main className='flex flex-col w-[55vw] h-screen justify-center items-center space-y-10'>
          <div className='flex flex-col space-y-6'>
              <h2 className={`${ebgmd.className} text-4xl text-purple-400`}>Welcome Back</h2>
          </div>
          
<form>
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Email</label>
    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-80 h-10 placeholder:text-lg px-2" placeholder="name@email.com" required/>
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Password</label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" required/>
  </div>
  <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Submit</button>
</form>

        </main>
        </main>

  )
}
