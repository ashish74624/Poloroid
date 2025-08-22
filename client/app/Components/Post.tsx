import React from 'react';
import Card from './Card';
import { getAllPost } from '../services/getAllPost';
import { getData } from '../services/getUserData';
import { getLikedUsers } from '../services/getLikedUsers';


type props = {
  email: string,
}

export default async function Post({ email }: props) {
  const postData = await getAllPost(email)
  return (
    <>
      {
        Array.isArray(postData)
          ?
          postData.map(async (post: any) => {
            const userData = await getData(email)
            const likedBy = await getLikedUsers(post.id)
            console.log("likedBy", likedBy)

            return (
              <main key={post.id}>
                <Card id={post.id} email={decodeURIComponent(email)} likes={post.likes_count} likedBy={Array.isArray(likedBy) ? likedBy : []} image={post.image} caption={post.caption} userData={userData} />
              </main>
            )
          })
          :
          <>No Posts</>
      }
    </>
  );
};
