import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

interface PersonSuggestion {
    id: string;
    name: string;
    avatar: string;
    mutualFriends: number;
    username: string;
}

const mockSuggestions: PersonSuggestion[] = [
    {
        id: "1",
        name: "Sarah Chen",
        avatar: "", // Will use fallback
        mutualFriends: 5,
        username: "sarahc_photos"
    },
    {
        id: "2",
        name: "Mike Johnson",
        avatar: "", // Will use fallback
        mutualFriends: 3,
        username: "mike_captures"
    },
    {
        id: "3",
        name: "Emma Wilson",
        avatar: "", // Will use fallback
        mutualFriends: 8,
        username: "emma_moments"
    }
];

const PeopleYouMayKnow = () => {
    return (
        <Card className="bg-card border-border shadow-soft">
            <CardHeader>
                <CardTitle className="text-lg font-display">People You May Know</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {mockSuggestions.map((person) => (
                    <div key={person.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={person.avatar} alt={person.name} />
                                <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-semibold text-sm">{person.name}</h4>
                                <p className="text-muted-foreground text-xs">@{person.username}</p>
                                <p className="text-muted-foreground text-xs">{person.mutualFriends} mutual friends</p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            className="btn-vintage text-primary-foreground font-medium"
                        >
                            <UserPlus className="h-4 w-4 mr-1" />
                            Add
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default PeopleYouMayKnow;