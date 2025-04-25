import { Route } from "react-router";

import { EmployeeRoutePathEnum, RoutesWithPageNotFound } from "@shared/routes";

import { EmployeeFormPage } from "./EmployeeFormPage";
import { EmployeesListPage } from "./EmployeesListPage";

export function EmployeePageRoutes() {
    return (
        <RoutesWithPageNotFound>
            <Route index element={<EmployeesListPage />} />
            <Route path={EmployeeRoutePathEnum.EMPLOYEE_FORM} element={<EmployeeFormPage />} />
        </RoutesWithPageNotFound>
    );
}
