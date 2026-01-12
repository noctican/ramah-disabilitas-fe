import { AUTH } from '@/data/const/api_path'
import { useAuthStore } from '@/data/store/auth_store'
import { apiClient } from '@/lib/api-client'
import { getToken } from '@/lib/token-handler'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_auth')({
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
    return <Outlet />
}
