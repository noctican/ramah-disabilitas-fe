import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import AuthIllustration from '@/components/illustrations/AuthIllustration'
import { useAuthStore } from '@/data/store/auth_store'
import { ROLE_STUDENT, ROLE_TEACHER } from '@/data/enums/roles'
import { useEffect } from 'react'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isAuthenticated, role } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
      if(isAuthenticated && role === ROLE_TEACHER) navigate({to: '/teacher'})
      else if(isAuthenticated && role === ROLE_STUDENT) navigate({to: '/classes'})
      else if(isAuthenticated) navigate({to: '/'})  
  }, [isAuthenticated])
  return (
    <>
    <div className="relative flex min-h-dvh w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#aaa_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="w-full max-w-sm md:max-w-4xl z-10">
        <div className="flex flex-col gap-6 w-full">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <img src="/logos/logo.png" alt="" className='h-6 mx-auto mb-4'/>
                <Outlet />
              </div>
              <div className="bg-primary relative hidden md:block">
                <AuthIllustration className='w-full p-12' />
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
    </>
  )
}
