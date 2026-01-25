import React from 'react'
import NotfSkel from '@/app/Skels/NotfSkel'
import { Comfortaa } from 'next/font/google'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Poloroid | Friends'
}

const arr = [1, 2, 3, 4, 5, 6]

export default function SkelPage() {
    return (
        <section className='flex flex-col items-center py-6'>
            {
                arr.map((item) => (
                    <NotfSkel key={item} />
                ))
            }
        </section>
    )
}
