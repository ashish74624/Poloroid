import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Grid, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import samplePhoto1 from "@/assets/fernando.jpg";
import samplePhoto2 from "@/assets/oscDP.jpg";
import samplePhoto3 from "@/assets/max2022.jpg";

const userProfile = {
    name: "John Doe",
    username: "john_photographer",
    bio: "Capturing life's beautiful moments 📸 | Travel enthusiast ✈️ | Coffee lover ☕",
    avatar: "",
    coverPhoto: "",
    stats: {
        posts: 42,
        friends: 189,
        likes: 1250
    }
};

const userPosts = [
    { id: "1", image: samplePhoto1, likes: 142 },
    { id: "2", image: samplePhoto2, likes: 89 },
    { id: "3", image: samplePhoto3, likes: 203 },
    { id: "4", image: samplePhoto1, likes: 67 },
    { id: "5", image: samplePhoto2, likes: 134 },
    { id: "6", image: samplePhoto3, likes: 98 }
];

const Profile = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="max-w-4xl mx-auto px-4 pt-24 pb-12">
                {/* Profile Header */}
                <Card className="polaroid-frame mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                            <Avatar className="h-32 w-32 mx-auto md:mx-0">
                                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                                <AvatarFallback className="text-2xl">{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h1 className="text-2xl font-display font-bold mb-1">{userProfile.name}</h1>
                                        <p className="text-muted-foreground">@{userProfile.username}</p>
                                    </div>
                                    <Button variant="outline" className="mt-4 md:mt-0" asChild>
                                        <Link to="/edit-profile">
                                            <Settings className="h-4 w-4 mr-2" />
                                            Edit Profile
                                        </Link>
                                    </Button>
                                </div>

                                <p className="text-sm mb-4 max-w-md">{userProfile.bio}</p>

                                {/* Stats */}
                                <div className="flex justify-center md:justify-start space-x-8">
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-primary">{userProfile.stats.posts}</div>
                                        <div className="text-sm text-muted-foreground">Posts</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-primary">{userProfile.stats.friends}</div>
                                        <div className="text-sm text-muted-foreground">Friends</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-primary">{userProfile.stats.likes}</div>
                                        <div className="text-sm text-muted-foreground">Likes</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Content Tabs */}
                <Tabs defaultValue="posts" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="posts" className="flex items-center space-x-2">
                            <Grid className="h-4 w-4" />
                            <span>Posts</span>
                        </TabsTrigger>
                        <TabsTrigger value="liked" className="flex items-center space-x-2">
                            <Heart className="h-4 w-4" />
                            <span>Liked</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="posts" className="mt-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {userPosts.map((post) => (
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
                                            <span className="font-semibold">{post.likes}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="liked" className="mt-6">
                        <div className="text-center py-12">
                            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No liked posts yet</h3>
                            <p className="text-muted-foreground">Posts you like will appear here.</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default Profile;