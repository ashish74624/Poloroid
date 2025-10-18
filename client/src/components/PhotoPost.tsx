import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface PhotoPostProps {
    username: string;
    userAvatar: string;
    timeAgo: string;
    imageUrl: string;
    likes: number;
    caption: string;
    isLiked?: boolean;
}

const PhotoPost = ({
    username,
    userAvatar,
    timeAgo,
    imageUrl,
    likes,
    caption,
    isLiked = false
}: PhotoPostProps) => {
    const [liked, setLiked] = useState(isLiked);
    const [likeCount, setLikeCount] = useState(likes);

    const handleLike = () => {
        if (liked) {
            setLiked(false);
            setLikeCount(prev => prev - 1);
        } else {
            setLiked(true);
            setLikeCount(prev => prev + 1);
        }
    };

    return (
        <div className="polaroid-frame max-w-md mx-auto mb-8 animate-fade-in">
            {/* User Info Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={userAvatar} alt={username} />
                        <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-sm">{username}</h3>
                        <p className="text-muted-foreground text-xs">{timeAgo}</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </div>

            {/* Photo */}
            <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                    src={imageUrl}
                    alt="Post"
                    className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 film-grain pointer-events-none"></div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-accent transition-colors"
                        onClick={handleLike}
                    >
                        <Heart className={`h-5 w-5 ${liked ? 'fill-destructive text-destructive' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent">
                        <MessageCircle className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent">
                        <Share className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Likes and Caption */}
            <div className="space-y-2">
                <p className="font-semibold text-sm">{likeCount} likes</p>
                <p className="text-sm">
                    <span className="font-semibold">{username}</span> {caption}
                </p>
            </div>
        </div>
    );
};

export default PhotoPost;