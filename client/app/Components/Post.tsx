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
  console.log("postData", postData)
  return (
    <>
      {
        Array.isArray(postData)
          ?
          postData.map(async (post: any) => {
            const likedBy = await getLikedUsers(post.id)
            console.log("likedBy", likedBy)

            return (
              <main key={post.id}>
                <Card id={post.id} email={decodeURIComponent(post.email)} likes={post.likes_count} likedBy={Array.isArray(likedBy) ? likedBy : []} image={post.image} caption={post.caption} firstName={post.first_name} lastName={post.last_name} profileImage={post.profile_image} userId={post.user_id} />
              </main>
            )
          })
          :
          <>No Posts</>
      }
    </>
  );
};
