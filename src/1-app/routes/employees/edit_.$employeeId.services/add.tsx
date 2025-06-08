import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/employees/edit_/$employeeId/services/add',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/employees/edit_/$employeeId/services/add"!</div>
}
