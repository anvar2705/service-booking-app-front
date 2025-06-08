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

    const { t } = useTranslation(NamespaceEnum.SERVICE, { keyPrefix: "servicesList.columns" });

    const columns: ColumnDef<ServiceModel>[] = [
        {
            accessorFn: (row) => row.name,
            id: "name",
            header: t("name"),
        },
        {
            accessorFn: (row) => row.price_from,
            id: "price_from",
            header: t("price_from"),
        },
        {
            accessorFn: (row) => row.price_to,
            id: "price_to",
            header: t("price_to"),
        },
        {
            accessorFn: (row) => row.duration,
            id: "duration",
            header: t("duration"),
        },
        {
            id: "actions",
            header: () => <HeaderActions employeeId={employeeId} />,
            cell: (cellProps) => <CellActions {...cellProps} employeeId={employeeId} />,
            enableColumnFilter: false,
        },
    ];

    return <Table columns={columns} useQuery={useGetEmployeeServicesTableQuery} queryArg={employeeId} />;
};
