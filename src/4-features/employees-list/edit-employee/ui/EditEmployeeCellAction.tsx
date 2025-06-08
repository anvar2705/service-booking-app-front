import { useTranslation } from "react-i18next";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "@tanstack/react-router";

import { EmployeeModel } from "@entities/employee";
import { IconButton } from "@shared/components/buttons/IconButton";
import { NamespaceEnum } from "@shared/i18n";

export const EditEmployeeCellAction = ({ id }: { id: EmployeeModel["id"] }) => {
    const { t } = useTranslation(NamespaceEnum.EMPLOYEE, { keyPrefix: "employeesList" });

    return (
        <Link to="/employees/edit/$employeeId" params={{ employeeId: id }}>
            <IconButton color="primary" title={t("editEmployee")}>
                <EditOutlinedIcon />
            </IconButton>
        </Link>
    );
};
