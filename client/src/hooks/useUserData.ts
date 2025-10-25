import { useAuthContext } from "@/context/useAuthContext"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useApi } from "./useApi"
import type { Post, Suggestions, User } from "@/types"

export const useUserData = () => {
    const { email } = useAuthContext()

    const { get, post } = useApi()

    const getData = useQuery({
        queryKey: [email],
        queryFn: () => get<User>(`user/data/${email}`),
        enabled: !!email
    })

    const getUserAllPost = useQuery({
        queryKey: [email, "posts"],
        queryFn: () => get<Post[]>(`post/allPost/${email}`),
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

    return { getData, getUserAllPost, getFriendsSuggestion, sendFriendRequest }
}