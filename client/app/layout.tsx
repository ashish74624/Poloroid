import './globals.css'

export const metadata = {
  title: 'Polaroid',
  description: 'where your memories are always in focus',
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
