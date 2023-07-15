import Navbar from '@/app/Components/Navbar'
import React from 'react'

type Params={
  params:{
      email:string,
  }
}

export default function Dashboard({params:{email}}:Params) {
  return (
    <>
      <Navbar email={email} navData={false}/>
      <section className='h-max w-screen'>
        <div>
          <img src={''}/>
        </div>
      </section>
    </>
  )
}
