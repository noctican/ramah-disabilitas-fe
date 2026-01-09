import PublicHeader from '@/layout/PublicHeader'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex flex-col min-h-screen items-stretch bg-primary-50'>
        <PublicHeader />
        <main className='grow'>
            <Outlet />
        </main>
    </div>
  )
}
