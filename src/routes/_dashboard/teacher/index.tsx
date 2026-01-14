import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/teacher/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Halo "/_dashboard/teacher/"!</div>
}
