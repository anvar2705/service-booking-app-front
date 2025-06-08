import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

import { NamespaceEnum } from "@shared/i18n";
import { EmployeesListWidget } from "@widgets/employees-list";

export const Route = createFileRoute("/employees/")({
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
