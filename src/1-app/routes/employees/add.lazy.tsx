import { createLazyFileRoute } from "@tanstack/react-router";

import { EmployeeForm } from "@entities/employee";

export const Route = createLazyFileRoute("/employees/add")({
    component: AddEmployeeForm,
});

function AddEmployeeForm() {
    return <EmployeeForm mode={"add"} />;
}
