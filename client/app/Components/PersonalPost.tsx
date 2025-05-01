import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from './ui/card'

export default function PersonalPost({ src, title }: any) {
  return (

    <Card className="flex flex-col overflow-hidden bg-white text-zinc-800 rounded-lg overflow-ellipsis border w-56 xl:w-64 h-max">
      <CardContent>
        <img
          src={src}
          alt="Post"
          className="aspect-video object-cover w-56 xl:w-64 h-56"
        />
      </CardContent>
      <CardFooter className="w-full justify-center h-12 font-bold">
        <p>
          {title}
        </p>
      </CardFooter>
    </Card>

  )
}
