import { CellContext } from "@tanstack/react-table";

import { EmployeeModel } from "@entities/employee";
import { ServiceModel } from "@entities/service";

export type ServicesListWidgetProps = {
    employeeId: EmployeeModel["id"];
};

export type CellActionProps = CellContext<ServiceModel, unknown> & {
    employeeId: EmployeeModel["id"];
};
