import { createFileRoute } from "@tanstack/react-router";

import { EmployeeServicePage } from "@pages/employee";
import { FormModeEnum } from "@shared/routes";

export const Route = createFileRoute("/employees/edit_/$employeeId/services/add")({
    component: RouteComponent,
    params: { parse: ({ employeeId }) => ({ employeeId: Number(employeeId) }) },
});

function RouteComponent() {
    const { employeeId } = Route.useParams();

    return <EmployeeServicePage mode={FormModeEnum.ADD} employeeId={employeeId} />;
}
