import React from 'react';
import Card from './Card';
import { getAllPost } from '../services/getAllPost';
import { getData } from '../services/getUserData';


type props = {
  email: string,
}

export default async function Post({ email }: props) {
  const postData = await getAllPost(email)
  console.log("postData", postData)
  return (
    <>
      {
        Array.isArray(postData)
          ?
          postData.map(async (post: any) => {
            const userData = await getData(email)
          
            return(
            <main key={post.id}>
                <Card id={post.id} email={decodeURIComponent(email)} likes={post.likes}  image={post.image} caption={post.caption} userData={userData} />
            </main>
          )})
          :
          <>No Posts</>
      }
    </>
  );
};
