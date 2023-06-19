import React from 'react'
import UserCard from './UserCard'

export default function Suggestion() {
  return (
    <>
      <section className='w-[30vw] bg-[#C9E6F7] h-[89vh] fixed ml-[70vw] z-40  mx-4 my-1 rounded-lg flex flex-col items-center space-y-2 pt-4'>
        <h1>People you may know</h1>
        <div>
            <UserCard/>
        </div>
      </section>
    </>
  )
}
