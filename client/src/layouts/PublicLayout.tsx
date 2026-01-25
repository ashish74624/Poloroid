import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"

export default function PublicLayout() {
    return (
        <section className="bg-[#FCFBF9] h-screen w-screen overflow-y-auto overflow-x-clip">
            <Outlet />
            <Toaster />
        </section>
    )
}
