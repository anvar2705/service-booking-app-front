import { useTranslation } from "react-i18next";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "@tanstack/react-router";

import { EmployeeModel } from "@entities/employee";
import { ServiceModel } from "@entities/service";
import { IconButton } from "@shared/components/buttons/IconButton";
import { NamespaceEnum } from "@shared/i18n";

type EditServiceCellActionProps = {
    employeeId: EmployeeModel["id"];
    uuid: ServiceModel["uuid"];
};

export const EditServiceCellAction = (props: EditServiceCellActionProps) => {
    const { employeeId, uuid } = props;

    const { t } = useTranslation(NamespaceEnum.EMPLOYEE, { keyPrefix: "servicesList" });

    return (
        <Link to="/employees/edit/$employeeId/services/edit/$serviceId" params={{ employeeId, serviceId: uuid }}>
            <IconButton color="primary" title={t("editService")}>
                <EditOutlinedIcon />
            </IconButton>
        </Link>
    );
};
