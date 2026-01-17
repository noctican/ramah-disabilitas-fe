import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ROLE_STUDENT } from '@/data/enums/roles'
import { useAuthStore } from '@/data/store/auth_store'
import { SiteHeader } from '@/layout/DashHeader'
import { AppSidebar } from '@/layout/DashSidebar'
import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_dashboard')({
    component: RouteComponent,
})

function RouteComponent() {
    const { isAuthenticated, role, firstRender } = useAuthStore()
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuthenticated) navigate({to: '/login'})
        else if(isAuthenticated && role === ROLE_STUDENT) navigate({to: '/classes'})
    }, [isAuthenticated])

    if(!isAuthenticated) return null
    
    return (
        <SidebarProvider
            style={
                {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >        
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4  md:gap-6 p-4 lg:p-6">
                        <Outlet />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
