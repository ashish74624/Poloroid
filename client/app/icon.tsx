import { ImageResponse } from 'next/server'
import { Comfortaa } from 'next/font/google'
const Comf = Comfortaa({
    subsets:['cyrillic'],
    weight:'400'
  })
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 48,
  height: 48,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
  style={{
    backgroundColor: '#58b8e8',
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '35px',
    color: 'white',
    fontFamily: "'Comfortaa', cursive",
  }}
>
  P
</div>


    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}