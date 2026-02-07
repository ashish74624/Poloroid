import { useApi } from "./useApi"
import type { Post } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getEmailFromToken } from "@/lib/utils"
import toast from 'react-hot-toast';

export const usePost = (postId?: number) => {
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
        mutationFn: ({ email, image, caption }: { email: string, image: string, caption: string }) => post('post/upload', { email, image, caption }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            const serverMsg =
                error?.response?.data?.msg || error?.message || "Unable to upload post at the moment";

            toast.error(serverMsg);
        },

        onSuccess: () => {
            toast.success("Post uploaded successfully");
        }
    })

    const deletePost = useMutation({
        mutationFn: ({ id }: { id: number }) => post('post/delete', { id }),
        onSuccess: () => {
            toast.success("Post deleted successfully")
            getPersonalPosts.refetch()
        },
        onError: () => {
            toast.error("Unable to delete post")
        }
    })

    const isPostLikedByCurrentUser = useQuery({
        queryKey: ["isPostLikedByCurrentUser", email, postId],
        queryFn: async ({ queryKey }) => {
            const [, , postId] = queryKey
            const likedUsers = await get<string[]>(`post/getLikedUsers/${postId}`)
            return email ? likedUsers.includes(email) : false
        },

        enabled: !!email && !!postId
    })



    return { getUserAllPost, getPersonalPosts, createPost, isPostLikedByCurrentUser, deletePost }
}