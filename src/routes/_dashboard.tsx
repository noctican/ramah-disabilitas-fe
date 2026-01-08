import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AUTH } from '@/data/const/api_path'
import { useAuthStore } from '@/data/store/auth_store'
import { SiteHeader } from '@/layout/DashHeader'
import { AppSidebar } from '@/layout/DashSidebar'
import { apiClient } from '@/lib/api-client'
import { getToken } from '@/lib/token-handler'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
    beforeLoad: async () => {
        const { isAuthenticated, login, logout } = useAuthStore.getState()
        const token = getToken()
        
        if (!isAuthenticated) {
            if (token) {
                try {
                    const userData = await apiClient.get(AUTH.ME)
                    login(userData)
                    return 
                } catch (error) {
                    console.error("Session timeout", error)
                }
            }

            logout()
            
            throw redirect({
                to: '/login'
            })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
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
