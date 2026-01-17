import { useAuthStore } from '@/data/store/auth_store'
import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_public/_auth')({
    component: RouteComponent,
})

function RouteComponent() {
    const { isAuthenticated } = useAuthStore()
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuthenticated) navigate({to: '/login'})
    }, [isAuthenticated])

    if(!isAuthenticated) return null
    
    return <Outlet />
}
