import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { usePost } from "@/hooks/usePost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmailFromToken } from "@/lib/utils";
import { useApi } from "@/hooks/useApi";

interface PhotoPostProps {
    id: number;
    username: string;
    userAvatar: string;
    timeAgo: string;
    imageUrl: string;
    likes: number;
    caption: string;
}

const PhotoPost = ({
    id,
    username,
    userAvatar,
    // timeAgo,
    imageUrl,
    likes,
    caption,
}: PhotoPostProps) => {
    const email = getEmailFromToken()
    const queryClient = useQueryClient()
    const { isPostLikedByCurrentUser } = usePost(id)
    const { post } = useApi()

    const [liked, setLiked] = useState(false);


    const [likeCount, setLikeCount] = useState(likes);

    const handleLikePost = useMutation({
        mutationFn: () => post(`post/like/${id}`, { emailOfUser: email }),

        onMutate: () => {
            setLiked(prev => !prev)
            setLikeCount(prev => prev + (liked ? -1 : 1));
        },

        onError: () => {
            setLiked(prev => !prev)
            setLikeCount(prev => prev + (liked ? 1 : -1));
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["isPostLikedByCurrentUser", email, id]
            });
            queryClient.invalidateQueries({
                queryKey: ["getUserAllPost"]
            })
        }
    })

    const handleLike = () => {
        handleLikePost.mutate()
    };

    useEffect(() => {
        if (typeof isPostLikedByCurrentUser.data === "boolean") {
            setLiked(isPostLikedByCurrentUser.data);
        }
    }, [isPostLikedByCurrentUser.data]);


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
                        disabled={handleLikePost.isPending}
                        onClick={handleLike}
                    >
                        <Heart className={`h-5 w-5 ${liked ? 'fill-destructive text-destructive' : ''}`} />
                    </Button>
                    <span className="font-semibold text-sm">{likeCount} likes</span>

                </div>
            </CardDescription>

            <CardFooter className="space-y-2 p-0">
                <div className="text-sm">
                    <span className="font-semibold">{username}</span> {caption}
                </div>
            </CardFooter>
        </Card>
    );
};

export default PhotoPost;