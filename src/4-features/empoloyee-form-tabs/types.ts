import { EmployeeModel } from "@entities/employee";

export interface EmployeeFormTabsProps {
    activeTab: string;
    employeeId: EmployeeModel["id"];
}
