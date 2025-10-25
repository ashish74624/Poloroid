import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { useUserData } from "@/hooks/useUserData";
import toast from "react-hot-toast";

const PeopleYouMayKnow = () => {

    const { getFriendsSuggestion, sendFriendRequest } = useUserData()

    const handleAddFriend = (friendID: number) => {
        sendFriendRequest.mutate({ friendID }, {
            onSuccess: () => {
                toast.success("Friend request sent")
            },
            onError: () => {
                toast.error('Failed to send a friend request at the moment')
            }
        })
    }

    return (
        <Card className="bg-card border-border shadow-soft">
            <CardHeader>
                <CardTitle className="text-lg font-display">People You May Know</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {

                    getFriendsSuggestion.data?.suggestions
                        ?

                        getFriendsSuggestion.data?.suggestions?.map((person) => (
                            <div key={person.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 min-w-0">
                                    <Avatar className="h-12 w-12 flex-shrink-0">
                                        <AvatarImage src={person.profileImage} alt={`${person?.firstName} ${person?.lastName}`} />
                                        <AvatarFallback>{person.firstName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-sm truncate max-w-[150px]">{`${person?.firstName} ${person?.lastName}`}</h4>
                                        <p className="text-muted-foreground text-xs truncate max-w-[180px] pr-1">
                                            {person.email}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    className="btn-vintage text-primary-foreground font-medium"
                                    onClick={() => handleAddFriend(person.id)}
                                >
                                    <UserPlus className="h-4 w-4 mr-1" />
                                    Add
                                </Button>
                            </div>

                        ))
                        :
                        <div>
                            No Suggestions at the moment
                        </div>
                }
            </CardContent>
        </Card>
    );
};

export default PeopleYouMayKnow;