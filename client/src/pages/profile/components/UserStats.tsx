

export default function UserStats() {
    return (
        <div className="flex justify-start space-x-8">
            <div className="text-center">
                <div className="text-xl font-bold text-primary">
                    {/* {user?.stats.posts} */}
                    1
                </div>
                <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div className="text-center">
                <div className="text-xl font-bold text-primary">
                    {/* {user?.stats.friends} */}
                    5
                </div>
                <div className="text-sm text-muted-foreground">Friends</div>
            </div>
            <div className="text-center">
                <div className="text-xl font-bold text-primary">
                    {/* {user?.stats.likes} */}
                    55
                </div>
                <div className="text-sm text-muted-foreground">Likes</div>
            </div>
        </div>
    )
}
