'use client'
import React from 'react'
import getToken from '../lib/getToken'
import jwt from 'jsonwebtoken'

export default async function Home() {
  let a =true;

  const token = getToken();
  if(token){
    console.log(token);
    const decoded = jwt.decode(token) 
    if (typeof decoded === 'object' && decoded !== null) {
      const email = decoded.email;
      console.log(email);
    } else {
      console.error('Decoded token is not an object');
    }
		if (!decoded) {
			localStorage.removeItem('token')
		}
    else {
      return (
        a?(<>True</>):(<>False</>)
      )
		}
	}
  else{
    return(
      <>
        Coudn't find token        
      </>
    )
  }
}
