import { createFileRoute, isRedirect, Outlet, redirect } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import AuthIllustration from '@/components/illustrations/AuthIllustration'
import { useAuthStore } from '@/data/store/auth_store'
import { getToken } from '@/lib/token-handler'
import { apiClient } from '@/lib/api-client'
import { AUTH } from '@/data/const/api_path'
import { ROLE_TEACHER } from '@/data/enums/roles'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const { login, logout } = useAuthStore.getState()
    const token = getToken()

    if(!token) return

    try {
      const userData = await apiClient.get(AUTH.ME)
      login(userData.data.data)
      throw redirect({
        to: userData.data.data.role === ROLE_TEACHER ? '/lecturer' : '/student',
      })
    } catch (error) {
      if(isRedirect(error)) throw error
      console.error("Session restore failed:", error)
      logout()
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
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
                <img src="/favicon.ico" alt="" className='h-12 mx-auto'/>
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
