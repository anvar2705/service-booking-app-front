import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

import { NamespaceEnum } from "@shared/i18n";
import { FormModeEnum } from "@shared/routes";

import { EmployeeFormTitleProps } from "../types";

export const EmployeeFormTitle = ({ mode }: EmployeeFormTitleProps) => {
    const { t } = useTranslation(NamespaceEnum.EMPLOYEE, { keyPrefix: "form" });

    return (
        <Typography variant="h1" sx={{ mb: 2 }}>
            {mode === FormModeEnum.ADD ? t("addingTitle") : t("editingTitle")}
        </Typography>
    );
};
