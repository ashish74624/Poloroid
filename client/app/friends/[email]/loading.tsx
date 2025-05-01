import React from 'react'
import NotfSkel from '@/app/Skels/NotfSkel'
import { Comfortaa } from 'next/font/google'
import { Metadata } from 'next'
import SkelPage from '@/app/Skels/SkelPage'

export const metadata: Metadata = {
  title: 'Poloroid | Friends'
}

export default function loading() {
  return (
    <SkelPage />
  )
}
