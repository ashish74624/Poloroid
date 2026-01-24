import { Home, User, Users, Bell, LogOut } from "lucide-react";
import useNotification from "@/hooks/useNotification";
import NavItems from "./NavItems";

const Navigation = () => {
    const { getNotification } = useNotification()

    const notifications = getNotification?.data?.notifications
    return (
        <nav className="bg-card/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-4xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <h1 className="text-2xl font-comfortaa font-bold text-primary">
                        poloroid
                    </h1>

                    {/* Navigation Icons */}
                    <div className="flex items-center space-x-4">
                        <NavItems NavIcon={Home} helperText="Home" src="/home" />
                        <NavItems NavIcon={Users} helperText="Friends" src="/friends" />
                        <NavItems
                            NavIcon={Bell} helperText="Notifications" src="/notifications"
                            badge={notifications && notifications.length > 0} />
                        <NavItems NavIcon={User} helperText="Profile" src="/profile" />
                        <NavItems NavIcon={LogOut} helperText="Log Out" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;