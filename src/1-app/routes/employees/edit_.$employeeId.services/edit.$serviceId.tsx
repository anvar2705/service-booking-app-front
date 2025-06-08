import { createFileRoute } from "@tanstack/react-router";

import { EmployeeServicePage } from "@pages/employee";
import { FormModeEnum } from "@shared/routes";

export const Route = createFileRoute("/employees/edit_/$employeeId/services/edit/$serviceId")({
    component: RouteComponent,
    params: { parse: ({ employeeId, serviceId }) => ({ employeeId: Number(employeeId), serviceId }) },
});

function RouteComponent() {
    const { serviceId, employeeId } = Route.useParams();

    return <EmployeeServicePage mode={FormModeEnum.EDIT} serviceUUID={serviceId} employeeId={employeeId} />;
}
