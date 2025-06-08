import { useTranslation } from "react-i18next";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "@tanstack/react-router";

import { EmployeeModel } from "@entities/employee";
import { IconButton } from "@shared/components/buttons/IconButton";
import { NamespaceEnum } from "@shared/i18n";

export const AddServiceHeaderAction = ({ employeeId }: { employeeId: EmployeeModel["id"] }) => {
    const { t } = useTranslation(NamespaceEnum.EMPLOYEE, { keyPrefix: "servicesList" });

    return (
        <Link to={`/employees/edit/$employeeId/services/add`} params={{ employeeId: employeeId.toString() }}>
            <IconButton color="primary" title={t("addService")}>
                <AddOutlinedIcon />
            </IconButton>
        </Link>
    );
};
