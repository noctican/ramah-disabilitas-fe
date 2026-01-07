import PublicHeader from '@/layout/PublicHeader'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
        <PublicHeader />
    </>
  )
}
