import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { usePost } from "@/hooks/usePost";
import { useUserData } from "@/hooks/useUserData";
import UserStats from "./components/UserStats";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";


const Profile = () => {

    const { getPersonalPosts } = usePost()

    const { getData } = useUserData()

    const user = getData.data

    return (
        <section className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto p-4">
                <Card className="mb-8 max-w-3xl mx-auto">
                    <CardContent className="p-6 flex flex-row items-center justify-between relative">

                        <div className="flex gap-8 items-center">

                            <Avatar className="h-32 w-32">
                                <AvatarImage src={user?.profileImage} alt={user?.firstName} />
                                <AvatarFallback className="text-2xl">{user?.firstName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>

                            <div>
                                <div className="flex h-fit items-center gap-2 w-max">
                                    <h1 className="text-2xl font-display font-bold ">{user?.firstName} {user?.lastName}</h1>
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Button variant="ghost" asChild>
                                                <Link to='/edit-profile'>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            Edit Profile
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                                <p className="text-muted-foreground">{user?.email}</p>

                                <p className="text-sm mb-4 max-w-md">{user?.bio}</p>
                            </div>
                        </div>
                        {/* Stats */}
                        <UserStats />
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {
                        getPersonalPosts?.data?.length && getPersonalPosts?.data?.length > 0
                            ?
                            getPersonalPosts?.data?.map((post) => (
                                <div key={post.id} className="relative group cursor-pointer">
                                    <div className="polaroid-frame p-2">
                                        <img
                                            src={post.image}
                                            alt="User post"
                                            className="w-full h-48 object-cover rounded"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg">
                                        <div className="flex items-center text-white">
                                            <Heart className="h-5 w-5 mr-2" />
                                            <span className="font-semibold">{post.likesCount}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div>You have no posts</div>
                    }
                </div>
            </div>
        </section>
    );
};

export default Profile;