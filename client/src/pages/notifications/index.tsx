
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, UserPlus, Users } from "lucide-react";

interface Notification {
    id: string;
    type: 'like' | 'comment' | 'friend_request' | 'friend_accepted';
    user: {
        name: string;
        username: string;
        avatar: string;
    };
    content?: string;
    postImage?: string;
    timeAgo: string;
    isRead: boolean;
}

const mockNotifications: Notification[] = [
    {
        id: "1",
        type: "like",
        user: {
            name: "Sarah Chen",
            username: "sarahc_photos",
            avatar: ""
        },
        timeAgo: "2 minutes ago",
        isRead: false
    },
    {
        id: "2",
        type: "comment",
        user: {
            name: "Mike Johnson",
            username: "mike_captures",
            avatar: ""
        },
        content: "Amazing shot! 📸",
        timeAgo: "1 hour ago",
        isRead: false
    },
    {
        id: "3",
        type: "friend_request",
        user: {
            name: "Emma Wilson",
            username: "emma_moments",
            avatar: ""
        },
        timeAgo: "3 hours ago",
        isRead: true
    },
    {
        id: "4",
        type: "friend_accepted",
        user: {
            name: "Alex Turner",
            username: "alex_wanderer",
            avatar: ""
        },
        timeAgo: "1 day ago",
        isRead: true
    }
];

const NotificationItem = ({ notification }: { notification: Notification }) => {
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
                return `commented: "${notification.content}"`;
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
                            <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                            <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-1">
                            {getIcon()}
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold">{notification.user.name}</span>{" "}
                                    <span className="text-muted-foreground">{getMessage()}</span>
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.timeAgo}</p>
                            </div>

                            {notification.type === 'friend_request' && (
                                <div className="flex space-x-2">
                                    <Button size="sm" className="btn-vintage">Accept</Button>
                                    <Button size="sm" variant="outline">Decline</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const Notifications = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="max-w-2xl mx-auto px-4 pt-24 pb-12">
                <h1 className="text-3xl font-display font-bold mb-8">Notifications</h1>

                <div className="space-y-4">
                    {mockNotifications.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </div>

                {mockNotifications.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔔</div>
                        <h3 className="text-xl font-semibold mb-2">No notifications yet</h3>
                        <p className="text-muted-foreground">When someone likes your photos or sends you a friend request, you'll see it here.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Notifications;