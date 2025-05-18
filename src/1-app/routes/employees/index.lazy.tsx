import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

import { NamespaceEnum } from "@shared/i18n";
import { EmployeesListWidget } from "@widgets/lists/employees";

export const Route = createLazyFileRoute("/employees/")({
    component: EmployeesList,
});

function EmployeesList() {
    const { t } = useTranslation(NamespaceEnum.EMPLOYEE);

    return (
        <>
            <Typography variant="h1">{t("employeesListTitle")}</Typography>
            <EmployeesListWidget />
        </>
    );
}
