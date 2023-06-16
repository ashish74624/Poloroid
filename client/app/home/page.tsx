'use client'
import React from 'react'
import getToken from '../lib/getToken'
import jwt from 'jsonwebtoken'

export default async function Home() {

  const token = getToken();
  if(token){
    console.log(token);
    const decoded = jwt.decode(token) 
    if (typeof decoded === 'object' && decoded !== null) {
      const profileImage = decoded.profileImage
      console.log(profileImage);
      if (profileImage) {
        const email = decoded.email;
        const pimg = decoded.profileImage
        // Render the image component in your JSX/TSX code
      console.log(email);
      return (
        <>
          {email}
          <img src={pimg} alt='Profile Image'/>
        </>
      )
    }} 
    else {
      console.error('Decoded token is not an object');
    }
		// if (!decoded) {
		// 	localStorage.removeItem('token')
		// }
	}
  else{
    return(
      <>
        Coudn't find token        
      </>
    )
  }
}
