import { useAuthContext } from "@/context/useAuthContext"
import { useApi } from "./useApi"
import type { Post } from "@/types"
import { useQuery } from "@tanstack/react-query"

export const usePost = () => {
    const { email } = useAuthContext()

    const { get } = useApi()

    const getUserAllPost = useQuery({
        queryKey: [email, "posts"],
        queryFn: () => get<Post[]>(`post/allPost/${email}`),
        enabled: !!email
    })

    return { getUserAllPost }
}