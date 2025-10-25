import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast"

export default function MainLayout() {
    return (
        <section className="bg-[#FCFBF9] h-screen w-screen overflow-x-hidden overflow-y-auto ">
            <Outlet />
            <Toaster />
        </section>
    )
}
