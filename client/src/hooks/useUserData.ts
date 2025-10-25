import { useAuthContext } from "@/context/useAuthContext"
import { useQuery } from "@tanstack/react-query"
import { useApi } from "./useApi"
import type { Post, User } from "@/types"

export const useUserData = () => {
    const { email } = useAuthContext()

    const { get } = useApi()

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

    return { getData, getUserAllPost }
}