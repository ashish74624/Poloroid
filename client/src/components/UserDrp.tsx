import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../state';


export default function UserDrp() {
    const dispatch = useDispatch();
  return (
    <>
     <div className="flex items-center md:order-2 ml-6">
      <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src="/assets/p2.jpeg" alt="user photo"/>
      </button>
      <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href='/' className="drpbtn">Dashboard</a>
          </li>
          <li>
            <a href='/' className="drpbtn">Settings</a>
          </li>
          <li>
            <a href='/' className="drpbtn">Earnings</a>
          </li>
          <li>
            <span className="drpbtn" onClick={()=>{dispatch(setLogout)}} >LogOut</span>
          </li>
        </ul>
      </div>
  </div> 
    </>
  )
}
