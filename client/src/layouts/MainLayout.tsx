import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navigation from "@/components/Navigation";

export default function MainLayout() {
    return (
        <main className="bg-[#FCFBF9] h-screen w-screen overflow-hidden flex flex-col">
            <Navigation />
            <section className="flex-grow overflow-y-auto">
                <Outlet />
            </section>
            <Toaster />
        </main>
    )
}
