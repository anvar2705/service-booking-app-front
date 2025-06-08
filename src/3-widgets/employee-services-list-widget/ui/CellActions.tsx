import { EditServiceCellAction } from "@features/employee-services-list/edit-service";
import { UnpinServiceCellAction } from "@features/employee-services-list/unpin-service";

import { CellActionProps } from "../types";

export const CellActions = (props: CellActionProps) => {
    const { employeeId, row } = props;
    return (
        <>
            <EditServiceCellAction employeeId={employeeId} uuid={row.original.uuid} />
            <UnpinServiceCellAction employeeId={employeeId} service={row.original} />
        </>
    );
};
