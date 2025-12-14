import PeopleYouMayKnow from "@/components/PeopleYouMayKnow";
import PhotoPost from "@/components/PhotoPost";
import { usePost } from "@/hooks/usePost";
import { useUserData } from "@/hooks/useUserData";
import UploadPost from "./components/UploadPost";



export default function Home() {
    const { getData } = useUserData();

    const { getUserAllPost } = usePost()

    if (getUserAllPost.isLoading || getUserAllPost.isPending) {
        return <>Loading...</>
    }

    if (getUserAllPost.data?.length === 0) {
        return <>No Posts Available</>
    }

    const user = getData.data

    return (
        <section className="max-w-6xl mx-auto p-4 ">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Photo Feed */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-display font-bold mb-8 text-center">
                        Latest Moments
                    </h2>
                    <div className="space-y-8">
                        {getUserAllPost.data?.map((post) => (
                            <PhotoPost
                                key={post.id}
                                username={`${user?.firstName} ${user?.lastName}`}
                                userAvatar={post.profileImage}
                                timeAgo={post.createdAt}
                                imageUrl={post.image}
                                likes={Number(post.likesCount)}
                                caption={post.caption}
                                isLiked={true}
                            />
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-4 space-y-4">
                        <PeopleYouMayKnow />
                        <UploadPost />
                    </div>
                </div>
            </div>
        </section>
    )
}
