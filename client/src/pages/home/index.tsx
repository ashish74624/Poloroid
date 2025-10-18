import samplePhoto1 from "@/assets/fernando.jpg";
import samplePhoto2 from "@/assets/max2022.jpg";
import samplePhoto3 from "@/assets/oscDP.jpg";
import PeopleYouMayKnow from "@/components/PeopleYouMayKnow";
import PhotoPost from "@/components/PhotoPost";


const mockPosts = [
    {
        id: "1",
        username: "alex_wanderer",
        userAvatar: "", // Will use fallback
        timeAgo: "2 hours ago",
        imageUrl: samplePhoto1,
        likes: 142,
        caption: "Golden hour by the lake never gets old ✨ #sunset #peaceful #naturephotography",
        isLiked: false
    },
    {
        id: "2",
        username: "cafe_lover_jen",
        userAvatar: "", // Will use fallback
        timeAgo: "4 hours ago",
        imageUrl: samplePhoto2,
        likes: 89,
        caption: "Perfect morning fuel ☕ Nothing beats a good cup of coffee to start the day!",
        isLiked: true
    },
    {
        id: "3",
        username: "friends_forever",
        userAvatar: "", // Will use fallback
        timeAgo: "6 hours ago",
        imageUrl: samplePhoto3,
        likes: 203,
        caption: "Squad goals! Best friends make every day brighter 🌟 #friendship #goodtimes",
        isLiked: false
    }
];


export default function Home() {
    return (
        <main className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Photo Feed */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-display font-bold mb-8 text-center">
                        Latest Moments
                    </h2>
                    <div className="space-y-8">
                        {mockPosts.map((post) => (
                            <PhotoPost
                                key={post.id}
                                username={post.username}
                                userAvatar={post.userAvatar}
                                timeAgo={post.timeAgo}
                                imageUrl={post.imageUrl}
                                likes={post.likes}
                                caption={post.caption}
                                isLiked={post.isLiked}
                            />
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <PeopleYouMayKnow />
                    </div>
                </div>
            </div>
        </main>
    )
}
