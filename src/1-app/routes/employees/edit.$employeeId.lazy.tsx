import { createLazyFileRoute } from "@tanstack/react-router";

import { EmployeeForm } from "@entities/employee";

export const Route = createLazyFileRoute("/employees/edit/$employeeId")({
    component: EditEmployeeForm,
});

function EditEmployeeForm() {
    const { employeeId } = Route.useParams();

    return <EmployeeForm mode="edit" id={employeeId} />;
}
