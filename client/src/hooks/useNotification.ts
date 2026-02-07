import { getEmailFromToken } from "@/lib/utils"
import { useApi } from "./useApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { Notification } from "@/types"

interface getNotifications {
    status: string;
    notifications: Notification[]
}

const useNotification = () => {
    const email = getEmailFromToken()

    const { get, post } = useApi()

    const getNotification = useQuery({
        queryKey: [email, 'notification'],
        queryFn: () => get<getNotifications>(`notification/get_notifications/${email}`),
        enabled: !!email
    })

    const acceptFriendRequest = useMutation({
        mutationFn: ({ friendId }: { friendId: number }) => post(`user/addFriend/${email}`, { friendId }),
        onSuccess: () => getNotification.refetch()
    })

    const rejectFriendRequest = useMutation({
        mutationFn: ({ friendId }: { friendId: number }) => post(`user/rejectRequest/${friendId}`, { email: email }),
        onSuccess: () => getNotification.refetch()
    })

    return { getNotification, acceptFriendRequest, rejectFriendRequest }
}

export default useNotification