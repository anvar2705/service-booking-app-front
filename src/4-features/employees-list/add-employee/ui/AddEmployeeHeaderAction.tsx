import { useTranslation } from "react-i18next";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { IconButton } from "@shared/components/buttons/IconButton";
import { NamespaceEnum } from "@shared/i18n";
import { EmployeeRoutePathEnum, useStaticNavigate } from "@shared/routes";

export const AddEmployeeHeaderAction = () => {
    const { t } = useTranslation(NamespaceEnum.EMPLOYEE, { keyPrefix: "table" });

    const navigate = useStaticNavigate();

    return (
        <IconButton
            color="primary"
            title={t("addEmployee")}
            onClick={() => {
                navigate(EmployeeRoutePathEnum.GO_TO_ADD_EMPLOYEE_FORM);
            }}
        >
            <AddOutlinedIcon />
        </IconButton>
    );
};
