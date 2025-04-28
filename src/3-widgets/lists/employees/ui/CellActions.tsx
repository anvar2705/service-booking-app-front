import { CellContext } from "@tanstack/react-table";

import { EmployeeModel } from "@entities/employee";
import { DeleteEmployeeCellAction } from "@features/employees-list/delete-employee";
import { EditEmployeeCellAction } from "@features/employees-list/edit-employee";

export const CellActions = (props: CellContext<EmployeeModel, unknown>) => {
    return (
        <>
            <EditEmployeeCellAction id={props.row.original.id} />
            <DeleteEmployeeCellAction employee={props.row.original} />
        </>
    );
};
