import { createFileRoute } from "@tanstack/react-router";

import { EmployeeForm, EmployeeFormTitle } from "@entities/employee";
import { EmployeeFormTabs } from "@features/empoloyee-form-tabs";
import { FormModeEnum } from "@shared/routes";

export const Route = createFileRoute("/employees/edit/$employeeId")({
    component: RouteComponent,
    params: { parse: ({ employeeId }) => ({ employeeId: Number(employeeId) }) },
});

function RouteComponent() {
    const { employeeId } = Route.useParams();

    return (
        <>
            <EmployeeFormTitle mode={FormModeEnum.EDIT} />
            <EmployeeFormTabs activeTab="" employeeId={employeeId} />
            <EmployeeForm mode={FormModeEnum.EDIT} id={employeeId} />
        </>
    );
}
