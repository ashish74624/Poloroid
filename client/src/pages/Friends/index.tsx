import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, Users } from "lucide-react";
import { useUserData } from "@/hooks/useUserData";
import { FriendCard } from "./components/FriendCard";


const Friends = () => {

    const { getFriends, getFriendRequests, getFriendsSuggestion } = useUserData()

    return (
        <section className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto p-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-display font-bold">Friends</h1>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all" className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>All Friends ({getFriends.data?.friends.length})</span>
                        </TabsTrigger>
                        <TabsTrigger value="requests" className="flex items-center space-x-2">
                            <UserPlus className="h-4 w-4" />
                            <span>Requests ({getFriendRequests.data?.friendRequestUsers.length})</span>
                        </TabsTrigger>
                        <TabsTrigger value="suggestions" className="flex items-center space-x-2">
                            <Search className="h-4 w-4" />
                            <span>Suggestions</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getFriends.data?.friends?.map((friend) => (
                                <FriendCard key={friend.id} friend={friend} type="current" />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="requests" className="mt-6">
                        <div className="space-y-4">
                            {getFriendRequests.data?.friendRequestUsers && getFriendRequests.data?.friendRequestUsers.length > 0 ? (
                                getFriendRequests.data?.friendRequestUsers.map((friend) => (
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
                                {
                                    getFriendsSuggestion.data?.suggestions
                                        ?

                                        getFriendsSuggestion.data?.suggestions.map((friend) => (
                                            <FriendCard key={friend.id} friend={friend} type="suggestion" />
                                        ))
                                        :
                                        <div>
                                            No suggestions at the moment
                                        </div>
                                }
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default Friends;