import App from "@/App";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/login";
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
            }
        ]
    }
])

export default router