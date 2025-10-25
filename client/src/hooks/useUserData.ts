import { useAuthContext } from "@/context/useAuthContext"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useApi } from "./useApi"
import { type FriendRequests, type Friends, type Suggestions, type User } from "@/types"

export const useUserData = () => {
    const { email } = useAuthContext()

    const { get, post } = useApi()

    const getData = useQuery({
        queryKey: [email],
        queryFn: () => get<User>(`user/data/${email}`),
        enabled: !!email
    })


    const getFriendsSuggestion = useQuery({
        queryKey: [email, "friendsSuggestion"],
        queryFn: () => get<Suggestions>(`user/getFriendSuggestions/${email}`),
        enabled: !!email
    })

    const sendFriendRequest = useMutation({
        mutationFn: ({ friendID }: { friendID: number }) => post(`user/addFriend/${email}`, { friendID }),
        onSuccess: () => {
            getFriendsSuggestion.refetch()
        }
    })

    const getFriends = useQuery({
        queryKey: [email, "friends"],
        queryFn: () => get<Friends>(`user/friends/${email}`),
        enabled: !!email
    })

    const getFriendRequests = useQuery({
        queryKey: [email, 'friendRequests'],
        queryFn: () => get<FriendRequests>(`user/friendRequests/${email}`),
        enabled: !!email
    })

    return { getData, getFriendsSuggestion, sendFriendRequest, getFriends, getFriendRequests }
}