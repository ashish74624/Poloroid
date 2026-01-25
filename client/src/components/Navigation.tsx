import { Home, User, Users, Bell, LogOut, Menu } from "lucide-react";
import useNotification from "@/hooks/useNotification";
import NavItem from "./NavItem";
import type { NavItemInterface } from '@/types';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";


const Navigation = () => {
    const { getNotification } = useNotification()

    const navigate = useNavigate()

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

    const handleLogOut = () => {
        localStorage.removeItem('token')
        navigate('/', { replace: true })
    }

    return (
        <nav className="bg-card/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-4xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-comfortaa font-bold text-primary">
                        poloroid
                    </h1>

                    <Sheet>
                        <SheetTrigger className="block md:hidden"><Menu /></SheetTrigger>
                        <SheetContent className=" pt-[10%] ">
                            {
                                navItems.slice(0, navItems.length - 1).map((navItem) => (
                                    <NavItem key={navItem.helperText} {...navItem} />
                                ))
                            }
                            <Dialog>
                                <DialogTrigger>
                                    <NavItem {...navItems[navItems.length - 1]} />
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        Are you sure ?
                                    </DialogHeader>
                                    <DialogDescription className=" space-x-4 ">
                                        <Button variant="destructive" className="text-white"
                                            onClick={handleLogOut}
                                        >
                                            Yes
                                        </Button>
                                        <DialogClose asChild >
                                            <Button variant="outline">
                                                Close
                                            </Button>
                                        </DialogClose>
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                        </SheetContent>
                    </Sheet>

                    <div className="md:flex items-center space-x-4  hidden">

                        {
                            navItems.slice(0, navItems.length - 1).map((navItem) => (
                                <NavItem key={navItem.helperText} {...navItem} />
                            ))
                        }
                        <Dialog>
                            <DialogTrigger>
                                <NavItem {...navItems[navItems.length - 1]} />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    Are you sure ?
                                </DialogHeader>
                                <DialogDescription className=" space-x-4 ">
                                    <Button variant="destructive" className="text-white"
                                        onClick={handleLogOut}
                                    >
                                        Yes
                                    </Button>
                                    <DialogClose asChild >
                                        <Button variant="outline">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogDescription>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default Navigation;