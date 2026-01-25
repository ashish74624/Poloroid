import AcceptFriendRequestButton from "@/components/AcceptFriendRequestButton";
import RejectFriendRequestButton from "@/components/RejectFriendRequestButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { User } from "@/types";
import { UserPlus } from "lucide-react";

export const FriendCard = ({ friend, type }: { friend: Partial<User>; type: 'current' | 'request' | 'suggestion' }) => {
    return (
        <Card className="polaroid-frame">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={friend.profileImage} alt={friend.firstName} />
                                <AvatarFallback>
                                    {friend?.firstName?.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>

                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">
                                {friend.firstName} {friend.lastName}
                            </h3>
                            <p className="text-muted-foreground text-xs">{friend.email}</p>
                            {/* {friend.mutualFriends && (
                                <p className="text-muted-foreground text-xs">{friend.mutualFriends} mutual friends</p>
                            )} */}
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        {type === 'request' && (
                            <>
                                <AcceptFriendRequestButton friendId={friend.id ?? 0} />
                                <RejectFriendRequestButton friendId={friend.id ?? 0} />
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
