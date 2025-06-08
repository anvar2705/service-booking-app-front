import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";

import { useGetEmployeeServicesTableQuery } from "@entities/employee";
import { ServiceModel } from "@entities/service";
import { Table } from "@shared/components/Table";
import { NamespaceEnum } from "@shared/i18n";

import { ServicesListWidgetProps } from "../types";

import { CellActions } from "./CellActions";
import { HeaderActions } from "./HeaderActions";

export const EmployeeServicesListWidget = (props: ServicesListWidgetProps) => {
    const { employeeId } = props;

    const { t } = useTranslation(NamespaceEnum.EMPLOYEE, { keyPrefix: "servicesList.columns" });

    const columns: ColumnDef<ServiceModel>[] = [
        {
            id: "name",
            header: t("name"),
            cell: (info) => info.getValue(),
        },
        {
            id: "price_from",
            header: t("price_from"),
            cell: (info) => info.getValue(),
        },
        {
            id: "price_to",
            header: t("price_to"),
            cell: (info) => info.getValue(),
        },
        {
            id: "duration",
            header: t("duration"),
            cell: (info) => info.getValue(),
        },
        // {
        //     id: "name",
        //     header: t("name"),
        //     cell: (info) => {
        //         const { name, surname, patronymic } = info.row.original;
        //         if (!name && !surname && !patronymic) return "-";
        //         return `${name} ${surname ?? ""} ${patronymic ?? ""}`;
        //     },
        // },
        // {
        //     accessorFn: (row) => row.user.email,
        //     id: "email",
        //     header: t("email"),
        //     cell: (info) => info.getValue(),
        // },
        {
            id: "actions",
            header: () => <HeaderActions employeeId={employeeId} />,
            cell: (cellProps) => <CellActions {...cellProps} employeeId={employeeId} />,
            enableColumnFilter: false,
        },
    ];

    return <Table columns={columns} useQuery={useGetEmployeeServicesTableQuery} queryArg={employeeId} />;
};
