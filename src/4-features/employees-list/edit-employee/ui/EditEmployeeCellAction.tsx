import { useTranslation } from "react-i18next";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { EmployeeModel } from "@entities/employee";
import { IconButton } from "@shared/components/buttons/IconButton";
import { NamespaceEnum } from "@shared/i18n";
import { EmployeeRoutePathEnum, useStaticNavigate } from "@shared/routes";

export const EditEmployeeCellAction = ({ id }: { id: EmployeeModel["id"] }) => {
    const { t } = useTranslation(NamespaceEnum.EMPLOYEE, { keyPrefix: "table" });

    const navigate = useStaticNavigate();

    return (
        <IconButton
            color="primary"
            title={t("editEmployee")}
            onClick={() => {
                navigate(EmployeeRoutePathEnum.GO_TO_EDIT_EMPLOYEE_FORM + id);
            }}
        >
            <EditOutlinedIcon />
        </IconButton>
    );
};
