import { Heart, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "./ui/card";

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
    // timeAgo,
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
        <Card className="max-w-md mx-auto border animate-fade-in bg-card border-border shadow-soft p-4 space-y-1.5 ">
            <CardHeader className="flex flex-row  justify-between items-center p-0">
                <div className="flex items-center space-x-3 ">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={userAvatar} alt={username} />
                        <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-sm">{username}</h3>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 ">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </CardHeader>

            {/* Photo */}
            <CardContent className="relative overflow-hidden rounded-lg p-0 ">
                <img
                    src={imageUrl}
                    alt="Post"
                    className="w-full h-80 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 film-grain pointer-events-none"></div>
            </CardContent>

            {/* Action Buttons */}
            <CardDescription className="flex items-center justify-between p-0">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-accent transition-colors"
                        onClick={handleLike}
                    >
                        <Heart className={`h-5 w-5 ${liked ? 'fill-destructive text-destructive' : ''}`} />
                    </Button>
                    <p className="font-semibold text-sm">{likeCount} likes</p>

                </div>
            </CardDescription>

            <CardFooter className="space-y-2 p-0">
                <p className="text-sm">
                    <span className="font-semibold">{username}</span> {caption}
                </p>
            </CardFooter>
        </Card>
    );
};

export default PhotoPost;