import { AddServiceHeaderAction } from "@features/employee-services-list/add-service";

import { ServicesListWidgetProps } from "../types";

export const HeaderActions = (props: ServicesListWidgetProps) => {
    const { employeeId } = props;
    return <AddServiceHeaderAction employeeId={employeeId} />;
};
