import useNotification from "@/hooks/useNotification";
import { Button } from "./ui/button";

export default function RejectFriendRequestButton({ friendId }: { friendId: number }) {

    const { rejectFriendRequest } = useNotification()


    return <Button size="sm" variant="outline" onClick={() => rejectFriendRequest.mutate({ friendId })}>Decline</Button>
}
