import { CellContext } from "@tanstack/react-table";

import { EmployeeModel } from "@entities/employee";
import { DeleteEmployeeCellAction } from "@features/employees-list/delete-employee";
import { EditEmployeeCellAction } from "@features/employees-list/edit-employee";

export const CellActions = (props: CellContext<EmployeeModel, unknown>) => {
    const { row } = props;

    return (
        <>
            <EditEmployeeCellAction id={row.original.id} />
            <DeleteEmployeeCellAction employee={row.original} />
        </>
    );
};
