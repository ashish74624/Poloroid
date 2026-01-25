// Post.tsx (Server Component)
import Card from './Card';
import { getAllPost } from '../services/getAllPost';
import { getLikedUsers } from '../services/getLikedUsers';
import { getData } from '../services/getUserData';

type Props = { email: string };

export default async function Post({ email }: Props) {
  const postData = await getAllPost(email);
  const userData = await getData(email);

  if (!Array.isArray(postData)) return <>No Posts</>;

  const postsWithLikes = await Promise.all(
    postData.map(async (post: any) => {
      const likedBy = await getLikedUsers(post.id);
      return { ...post, likedBy };
    })
  );

  return (
    <>
      {postsWithLikes.map((post: any) => (
        <Card
          key={post.id}
          id={post.id}
          emailOfCurrentUser={decodeURIComponent(email)}
          likes={post.likes_count}
          likedBy={Array.isArray(post.likedBy) ? post.likedBy : []}
          image={post.image}
          caption={post.caption}
          firstName={post.first_name}
          lastName={post.last_name}
          profileImage={post.profile_image}
          userId={userData.id}
        />
      ))}
    </>
  );
}
