import useNotification from "@/hooks/useNotification";
import { Button } from "./ui/button";

export default function AcceptFriendRequestButton({ friendId }: { friendId: number }) {

    const { acceptFriendRequest } = useNotification()


    return <Button size="sm" className="btn-vintage"
        onClick={() => acceptFriendRequest.mutate({ friendId })} >Accept</Button>
}
