import { createFileRoute } from "@tanstack/react-router";

import { EmployeeForm, EmployeeFormTitle } from "@entities/employee";
import { FormModeEnum } from "@shared/routes";

export const Route = createFileRoute("/employees/add")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <EmployeeFormTitle mode={FormModeEnum.ADD} />
            <EmployeeForm mode={FormModeEnum.ADD} />
        </>
    );
}
