import React from 'react'
import Image from 'next/image'

export default function NotfCard({friendImage,friendName}:any) {
    
        return (
            <>
              <section className='bg-white h-16 my-3 w-[50vw] rounded-lg shadow flex items-center justify-between'>
                <span className='flex ml-4'>
                    <Image className='w-11 h-11 rounded-full' src={friendImage} alt='Notification' height={100} width={100}/>
                    <h4 className='pt-[0.375rem] pl-2 text-[#F8C732] font-bold text-lg'>{friendName}</h4>
                    <p className='pt-2 pl-2 font-normal'>wants to be your friend</p>
                </span>
                <span className='space-x-4 mr-4'>
                    <button className='bg-[#58b8e8] hover:bg-[#4cc3ff] px-7 text-white py-2 rounded-lg transition duration-300'>
                        Accept
                    </button>
                    <button className='bg-red-500 hover:bg-red-700 transition duration-300 px-7 text-white py-2 rounded-lg'>Reject</button>
                </span>
              </section>
            </>
          )
    
  
}
