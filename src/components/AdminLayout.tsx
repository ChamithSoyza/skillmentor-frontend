import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/app-sidebar.tsx";
import {Outlet} from "react-router";

export default function AdminLayout() {

    return (
        <>
            <SidebarProvider>
                <AppSidebar/>
                <main className="flex flex-1 justify-center align-middle">
                    <SidebarTrigger/>
                    <Outlet/>
                </main>
            </SidebarProvider>
        </>
    );

}