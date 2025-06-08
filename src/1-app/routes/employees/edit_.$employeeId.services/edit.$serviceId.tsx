import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employees/edit_/$employeeId/services/edit/$serviceId")({
    component: RouteComponent,
    params: { parse: ({ employeeId, serviceId }) => ({ employeeId: Number(employeeId), serviceId }) },
});

function RouteComponent() {
    return <div>Hello "/employees/edit_/$employeeId/services/edit/$serviceId"!</div>;
}
