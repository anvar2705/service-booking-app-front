import { useTranslation } from "react-i18next";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "@tanstack/react-router";

import { IconButton } from "@shared/components/buttons/IconButton";
import { NamespaceEnum } from "@shared/i18n";

export const AddEmployeeHeaderAction = () => {
    const { t } = useTranslation(NamespaceEnum.EMPLOYEE, { keyPrefix: "employeesList" });

    return (
        <Link to="/employees/add">
            <IconButton color="primary" title={t("addEmployee")}>
                <AddOutlinedIcon />
            </IconButton>
        </Link>
    );
};
