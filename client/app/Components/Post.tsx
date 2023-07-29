import React from 'react';
import Card from './Card';

interface Post {
  _id: string;
  firstName: string;
  lastName: string;
  caption: string;
  image: string;
  email: string;
  likes: number;
  isLiked: boolean;
  userProfile:string;
}

type props ={
  promise : Promise<Post[]>,
  email:string,
  userId:string
}

export default async function Post({promise,email,userId}:props) {
  const postData = await promise
  return (
    <>
    {
      postData.map((post:any)=>(
        <main key={post._id}>
          <Card id={post._id} firstName={post.firstName} lastName={post.lastName} email={email} userProfile={post.userProfile} likes={post.likes} likedBy={post.likedBy} image={post.image} caption={post.caption} userID={userId}  />
        </main>
      ))
    }    
    </>
  );
};
