import { Toaster } from 'react-hot-toast'
import './globals.css'
import { Comfortaa } from 'next/font/google'
import Sidebar from './Components/Sidebar';


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
      <body className={`${Com.className} flex w-screen bg-[#F8F8F8]`} >
        <Sidebar />
        <main className=' flex-1'>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
