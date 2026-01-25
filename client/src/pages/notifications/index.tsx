import useNotification from "@/hooks/useNotification";
import { NotificationItem } from "./components/NotificationItem";
import Loading from "@/components/Loading";


const Notifications = () => {
    const { getNotification } = useNotification()

    if (getNotification.isPending || getNotification.isLoading) {
        return <Loading />
    }

    const notifications = getNotification?.data?.notifications

    return (
        <section className="min-h-screen bg-background">
            <div className="max-w-2xl mx-auto p-4 ">
                <h1 className="text-3xl font-display font-bold mb-8">Notifications</h1>

                <div className="space-y-4">

                    {
                        notifications && notifications.length > 0
                            ?
                            notifications.map((notification) => (
                                <NotificationItem key={notification.id} notification={notification} />
                            ))
                            :
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🔔</div>
                                <h3 className="text-xl font-semibold mb-2">No notifications yet</h3>
                                <p className="text-muted-foreground">When someone likes your photos or sends you a friend request, you'll see it here.</p>
                            </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default Notifications;