import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/$settingsTab')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings/$tab"!</div>
}
