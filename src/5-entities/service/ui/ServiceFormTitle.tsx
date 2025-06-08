import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

import { NamespaceEnum } from "@shared/i18n";
import { FormModeEnum } from "@shared/routes";

import { ServiceFormTitleProps } from "../types";

export const ServiceFormTitle = (props: ServiceFormTitleProps) => {
    const { mode, employeeId } = props;

    const { t } = useTranslation(NamespaceEnum.SERVICE, { keyPrefix: "form" });

    return (
        <Typography variant="h1" sx={{ mb: 2 }}>
            {employeeId && mode === FormModeEnum.ADD && t("addServiceForEmployeeTitle")}
            {!employeeId && mode === FormModeEnum.ADD && t("addingTitle")}
            {mode === FormModeEnum.EDIT && t("editingTitle")}
        </Typography>
    );
};
