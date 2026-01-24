import { Home, User, Users, Bell, LogOut } from "lucide-react";
import useNotification from "@/hooks/useNotification";
import NavItem from "./NavItem";
import type { NavItemInterface } from '@/types';



const Navigation = () => {
    const { getNotification } = useNotification()

    const notifications = getNotification?.data?.notifications

    const navItems: NavItemInterface[] = [
        {
            NavIcon: Home,
            helperText: "Home",
            src: "/home"
        },
        {
            NavIcon: Users,
            helperText: "Friends",
            src: "/friends"
        },
        {
            NavIcon: Bell,
            helperText: "Notifications",
            src: "/notifications",
            badge: notifications && notifications.length > 0

        },
        {
            NavIcon: User,
            helperText: "Profile",
            src: "/profile"
        },
        {
            NavIcon: LogOut,
            helperText: "Log out",
        },
    ]

    return (
        <nav className="bg-card/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-4xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-comfortaa font-bold text-primary">
                        poloroid
                    </h1>

                    <div className="flex items-center space-x-4">
                        {
                            navItems.map((navItem) => (
                                <NavItem NavIcon={navItem.NavIcon} helperText={navItem.helperText} src={navItem.src} badge={navItem.badge} />

                            ))
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;