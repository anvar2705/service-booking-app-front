import { createFileRoute } from "@tanstack/react-router";

import { EmployeeFormTitle } from "@entities/employee";
import { EmployeeFormTabs } from "@features/empoloyee-form-tabs";
import { FormModeEnum } from "@shared/routes";
import { EmployeeServicesListWidget } from "@widgets/employee-services-list-widget";

export const Route = createFileRoute("/employees/edit_/$employeeId/services/")({
    component: RouteComponent,
    params: { parse: ({ employeeId }) => ({ employeeId: Number(employeeId) }) },
});

function RouteComponent() {
    const { employeeId } = Route.useParams();

    return (
        <>
            <EmployeeFormTitle mode={FormModeEnum.EDIT} />
            <EmployeeFormTabs activeTab="services" employeeId={employeeId} />
            <EmployeeServicesListWidget employeeId={Number(employeeId)} />
        </>
    );
}
