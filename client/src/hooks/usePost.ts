import { useApi } from "./useApi"
import type { Post } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getEmailFromToken } from "@/lib/utils"

export const usePost = () => {
    const email = getEmailFromToken()

    const { get, post } = useApi()

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

    const createPost = useMutation({
        mutationFn: ({ email, image, caption }: { email: string, image: string, caption: string }) => post('post/upload', { email, image, caption })
    })


    return { getUserAllPost, getPersonalPosts, createPost }
}