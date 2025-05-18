import { createLazyFileRoute } from "@tanstack/react-router";

import { EmployeesListWidget } from "@widgets/lists/employees";

export const Route = createLazyFileRoute("/employees/")({
    component: EmployeesList,
});

function EmployeesList() {
    return <EmployeesListWidget />;
}
