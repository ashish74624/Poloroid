import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Users, MessageCircle } from "lucide-react";

interface Friend {
    id: string;
    name: string;
    username: string;
    avatar: string;
    mutualFriends?: number;
    isOnline?: boolean;
}

const currentFriends: Friend[] = [
    {
        id: "1",
        name: "Sarah Chen",
        username: "sarahc_photos",
        avatar: "",
        isOnline: true
    },
    {
        id: "2",
        name: "Mike Johnson",
        username: "mike_captures",
        avatar: "",
        isOnline: false
    },
    {
        id: "3",
        name: "Emma Wilson",
        username: "emma_moments",
        avatar: "",
        isOnline: true
    },
    {
        id: "4",
        name: "Alex Turner",
        username: "alex_wanderer",
        avatar: "",
        isOnline: false
    }
];

const friendRequests: Friend[] = [
    {
        id: "5",
        name: "Lisa Rodriguez",
        username: "lisa_photos",
        avatar: "",
        mutualFriends: 3
    },
    {
        id: "6",
        name: "David Kim",
        username: "david_captures",
        avatar: "",
        mutualFriends: 7
    }
];

const suggestions: Friend[] = [
    {
        id: "7",
        name: "Maya Patel",
        username: "maya_lens",
        avatar: "",
        mutualFriends: 5
    },
    {
        id: "8",
        name: "James Wilson",
        username: "james_shots",
        avatar: "",
        mutualFriends: 2
    },
    {
        id: "9",
        name: "Anna Garcia",
        username: "anna_captures",
        avatar: "",
        mutualFriends: 8
    }
];

const FriendCard = ({ friend, type }: { friend: Friend; type: 'current' | 'request' | 'suggestion' }) => {
    return (
        <Card className="polaroid-frame">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={friend.avatar} alt={friend.name} />
                                <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            {type === 'current' && friend.isOnline && (
                                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">{friend.name}</h3>
                            <p className="text-muted-foreground text-xs">@{friend.username}</p>
                            {friend.mutualFriends && (
                                <p className="text-muted-foreground text-xs">{friend.mutualFriends} mutual friends</p>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        {type === 'current' && (
                            <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4" />
                            </Button>
                        )}
                        {type === 'request' && (
                            <>
                                <Button size="sm" className="btn-vintage">Accept</Button>
                                <Button size="sm" variant="outline">Decline</Button>
                            </>
                        )}
                        {type === 'suggestion' && (
                            <Button size="sm" className="btn-vintage">
                                <UserPlus className="h-4 w-4 mr-1" />
                                Add
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const Friends = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="max-w-4xl mx-auto px-4 pt-24 pb-12">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-display font-bold">Friends</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search friends..."
                            className="pl-10 w-64"
                        />
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all" className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>All Friends ({currentFriends.length})</span>
                        </TabsTrigger>
                        <TabsTrigger value="requests" className="flex items-center space-x-2">
                            <UserPlus className="h-4 w-4" />
                            <span>Requests ({friendRequests.length})</span>
                        </TabsTrigger>
                        <TabsTrigger value="suggestions" className="flex items-center space-x-2">
                            <Search className="h-4 w-4" />
                            <span>Suggestions</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentFriends.map((friend) => (
                                <FriendCard key={friend.id} friend={friend} type="current" />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="requests" className="mt-6">
                        <div className="space-y-4">
                            {friendRequests.length > 0 ? (
                                friendRequests.map((friend) => (
                                    <FriendCard key={friend.id} friend={friend} type="request" />
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <UserPlus className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">No friend requests</h3>
                                    <p className="text-muted-foreground">When someone sends you a friend request, it will appear here.</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="suggestions" className="mt-6">
                        <Card className="polaroid-frame mb-6">
                            <CardHeader>
                                <CardTitle className="font-display">People You May Know</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {suggestions.map((friend) => (
                                    <FriendCard key={friend.id} friend={friend} type="suggestion" />
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default Friends;