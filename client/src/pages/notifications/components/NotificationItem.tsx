import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, UserPlus, Users } from "lucide-react";
import type { Notification } from "@/types"
import AcceptFriendRequestButton from "@/components/AcceptFriendRequestButton";
import RejectFriendRequestButton from "@/components/RejectFriendRequestButton";



export const NotificationItem = ({ notification }: { notification: Notification }) => {
    const getIcon = () => {
        switch (notification.type) {
            case 'like':
                return <Heart className="h-5 w-5 text-destructive fill-destructive" />;
            case 'comment':
                return <MessageCircle className="h-5 w-5 text-primary" />;
            case 'friend_request':
                return <UserPlus className="h-5 w-5 text-accent-foreground" />;
            case 'friend_accepted':
                return <Users className="h-5 w-5 text-primary" />;
        }
    };

    const getMessage = () => {
        switch (notification.type) {
            case 'like':
                return "liked your photo";
            case 'comment':
                return `commented :`;
            case 'friend_request':
                return "sent you a friend request";
            case 'friend_accepted':
                return "accepted your friend request";
        }
    };

    return (
        <Card className={`polaroid-frame mb-4 ${!notification.isRead ? 'bg-accent/20' : ''}`}>
            <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                    <div className="relative">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={notification.senderProfileImage} alt={`${notification.senderFirstName} ${notification.senderLastName}`} />
                            <AvatarFallback>{notification.senderFirstName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-1">
                            {getIcon()}
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold">{`${notification.senderFirstName} ${notification.senderLastName}`}</span>{" "}
                                    <span className="text-muted-foreground">{getMessage()}</span>
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.createdAt}</p>
                            </div>

                            {notification.type === 'friend_request' && (
                                <div className="flex space-x-2">
                                    <AcceptFriendRequestButton friendId={notification.senderFriendId} />
                                    <RejectFriendRequestButton friendId={notification.senderFriendId} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
