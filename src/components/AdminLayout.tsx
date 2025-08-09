import * as React from "react";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/app-sidebar.tsx";

export default function AdminLayout({children}: { children: React.ReactNode }) {

    return (
        <>
            <SidebarProvider>
                <AppSidebar/>
                <main>
                    <SidebarTrigger/>
                    {children}
                </main>
            </SidebarProvider>
        </>
    );

}