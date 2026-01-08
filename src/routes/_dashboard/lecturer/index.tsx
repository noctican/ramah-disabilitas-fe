import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/lecturer/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/teacher/"!</div>
}
