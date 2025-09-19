import { Home, Search, User, Users, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-4xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <h1 className="text-2xl font-comfortaa font-bold text-primary">poloroid</h1>
                    </Link>

                    {/* Navigation Icons */}
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="hover:bg-accent" asChild>
                            <Link to="/">
                                <Home className="h-5 w-5" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-accent">
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-accent" asChild>
                            <Link to="/friends">
                                <Users className="h-5 w-5" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-accent relative" asChild>
                            <Link to="/notifications">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-accent" asChild>
                            <Link to="/profile">
                                <User className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;