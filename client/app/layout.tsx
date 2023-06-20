import './globals.css'

export const metadata = {
  title: 'Polaroid',
  description: 'where your memories are always in focus',
  icons:{
    icon:[
      '/favicon.ico?v=4',
    ],
    apple:[
      '/apple-touch-icon.png?v=4'
    ],
    shortcut: [
      '/apple-touch-icon.png']
  },
  manifest:'/site.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
