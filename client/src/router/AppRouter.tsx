import App from "@/App";
import MainLayout from "@/layouts/MainLayout";
import EditProfile from "@/pages/edit-profile";
import Friends from "@/pages/Friends";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Notifications from "@/pages/notifications";
import Profile from "@/pages/profile";
import SignUp from "@/pages/signup";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/', element: <App />
            },
            {
                path: 'login', element: <Login />
            },
            {
                path: 'signup', element: <SignUp />
            },
            {
                path: 'notifications', element: <Notifications />
            },
            {
                path: 'profile', element: <Profile />
            },
            {
                path: 'edit-profile', element: <EditProfile />
            },
            {
                path: 'friends', element: <Friends />
            },
            {
                path: 'home', element: <Home />
            }
        ]
    }
])

export default router