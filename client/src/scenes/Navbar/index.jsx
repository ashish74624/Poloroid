import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import  { setMode,setLogout } from '../../state'
import { useNavigate } from 'react-router-dom'
import UserDrp from '../../components/UserDrp.tsx'


export default function Navbar({login}) {
    const [menuToggle,setMenuToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=> state.user)
    const mode = useSelector((state)=>state.mode)
    // const FullName = `${user.firstName} ${user.lastName}`;
  return (
    <>
      
<nav className="bg-[#E9FF99] border-gray-200 border border-b-black">
  <div className={`max-w-screen-xl flex flex-wrap items-center ${login?"justify-between":"justify-center"} mx-auto p-4`}>
    {
      login ? (
        <>
    <div className='flex'>
  <a href="/" className="flex items-center mx-4">
      <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white
      text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-500 to-green-400
      "
      onClick={()=>{navigate('/home')}}
      >
        Stay 
      </span>
  </a>
  
<form>   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <input type="search" className="block  md:w-[23vw] lg:w-[18vw] h-10 p-4 pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search" required/>
        <button type="submit" className="text-white absolute right-2.5 h-8 bottom-[0.3rem] bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4">
          Search
        </button>
    </div>
</form></div>
<div className='flex'>
  <UserDrp/>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a href='/' className="btn" aria-current="page">Chat</a>
      </li>
      <li>
        <a href='/' className="btn">Notifications</a>
      </li>
      <li>
        <a href='/' className="btn">Help</a>
      </li>
      <li>
        <a href='/' className="btn">{mode}</a>
      </li>
    </ul>
  </div>
  </div>

  </>):
  (
  <>
    <a href="/" className="flex items-center mx-4">
      <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white
      text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-500 to-green-400
      "
      onClick={()=>{navigate('/home')}}
      >
        Stay 
      </span>
  </a>
  </>
  )
}
  </div>
</nav>

    </>
  )
}
