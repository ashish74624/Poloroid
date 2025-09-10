import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <section className="bg-[#FCFBF9] h-screen w-screen overflow-x-hidden overflow-y-auto ">
            <Outlet />
        </section>
    )
}
