import { useTranslation } from "react-i18next";
import { Tab, Tabs } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

import { NamespaceEnum } from "@shared/i18n";

import { EmployeeFormTabsProps } from "../types";

export const EmployeeFormTabs = (props: EmployeeFormTabsProps) => {
    const { activeTab, employeeId } = props;

    const { t } = useTranslation(NamespaceEnum.EMPLOYEE, { keyPrefix: "form.tabs" });

    const navigate = useNavigate();

    const handleChange = (_: React.SyntheticEvent, tab: string) => {
        navigate({ to: tab === "/" ? `/employees/edit/${employeeId}` : `/employees/edit/${employeeId}/${tab}` });
    };

    const isTabDisabled = !employeeId;

    return (
        <Tabs value={activeTab} onChange={handleChange} aria-label="basic tabs example">
            <Tab label={t("general")} value={""} disabled={isTabDisabled} />
            <Tab label={t("services")} value={"services"} disabled={isTabDisabled} />
        </Tabs>
    );
};
