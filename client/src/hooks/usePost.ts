import { useApi } from "./useApi"
import type { Post } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { getEmailFromToken } from "@/lib/utils"

export const usePost = () => {
    const email = getEmailFromToken()

    const { get } = useApi()

    const getUserAllPost = useQuery({
        queryKey: [email, "posts"],
        queryFn: () => get<Post[]>(`post/allPost/${email}`),
        enabled: !!email
    })

    const getPersonalPosts = useQuery({
        queryKey: [email, "personalPosts"],
        queryFn: () => get<Post[]>(`post/personalPosts/${email}`),
        enabled: !!email
    })

    return { getUserAllPost, getPersonalPosts }
}