import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";

import { useAccountCompany } from "@entities/account";
import { useGetCompanyEmployeesTableQuery } from "@entities/company/api/getCompanyEmployees";
import { EmployeeModel } from "@entities/employee";
import { Table } from "@shared/components/Table";
import { NamespaceEnum } from "@shared/i18n";

import { CellActions } from "./CellActions";
import { HeaderActions } from "./HeaderActions";

export const EmployeesListWidget = () => {
    const company = useAccountCompany();

    const { t } = useTranslation(NamespaceEnum.EMPLOYEE, { keyPrefix: "employeesList.columns" });

    const columns: ColumnDef<EmployeeModel>[] = useMemo(
        () => [
            {
                accessorFn: (row) => row.user.username,
                id: "username",
                header: t("username"),
            },
            {
                id: "name",
                header: t("name"),
                cell: (info) => {
                    const { name, surname, patronymic } = info.row.original;
                    if (!name && !surname && !patronymic) return "-";
                    return `${name} ${surname ?? ""} ${patronymic ?? ""}`;
                },
            },
            {
                accessorFn: (row) => row.user.email,
                id: "email",
                header: t("email"),
            },
            {
                id: "actions",
                header: HeaderActions,
                cell: CellActions,
                enableColumnFilter: false,
            },
        ],
        [t],
    );

    return <Table columns={columns} useQuery={useGetCompanyEmployeesTableQuery} queryArg={company?.uuid} />;
};
