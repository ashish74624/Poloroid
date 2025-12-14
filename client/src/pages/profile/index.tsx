import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { usePost } from "@/hooks/usePost";
import { useUserData } from "@/hooks/useUserData";


const Profile = () => {

    const { getPersonalPosts } = usePost()

    const { getData } = useUserData()

    const user = getData.data

    return (
        <section className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto p-4">
                {/* Profile Header */}
                <Card className="polaroid-frame mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                            <Avatar className="h-16 w-16 md:h-32 md:w-32 ">
                                <AvatarImage src={user?.profileImage} alt={user?.firstName} />
                                <AvatarFallback className="text-2xl">{user?.firstName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h1 className="text-2xl font-display font-bold mb-1">{user?.firstName} {user?.lastName}</h1>
                                        <p className="text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <Button variant="outline" className="mt-4 md:mt-0" asChild>
                                        <Link to="/edit-profile">
                                            <Settings className="h-4 w-4 mr-2" />
                                            Edit Profile
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
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