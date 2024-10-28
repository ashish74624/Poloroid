import './globals.css'
import { Comfortaa } from 'next/font/google'

export const metadata = {
  title: 'Polaroid',
  description: 'where your memories are always in focus',
}

const Com = Comfortaa({
  subsets: ['latin'],
  weight: '600'
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={Com.className} >{children}</body>
    </html>
  )
}
