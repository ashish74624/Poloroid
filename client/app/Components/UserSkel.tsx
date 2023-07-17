import React from 'react'

export default function UserSkel() {
  return (
    <>
     <div className=" animate-pulse w-[16vw] bg-white border border-gray-300 rounded-lg shadow  ">
            <div className="flex flex-col items-center pb-10">
                <div className="w-24 h-24 mb-3 rounded-full shadow-lg mt-6 bg-gray-500"></div>
                <h5 className="h-2.5 bg-gray-500 rounded-full  w-32 mb-2"></h5>
                <div className="flex mt-2 space-x-1 lg:space-x-3">
                    <button className="inline-flex items-center px-3 lg:px-4 py-1 lg:py-2 text-sm font-medium text-center text-white bg-[#58b8e8] rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 "
                    >Add friend</button>
                    <button className="inline-flex items-center px-3 lg:px-4 py-1 lg:py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 ">Remove</button>
                </div>
            </div>
          </div> 
    </>
  )
}
