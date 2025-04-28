import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { useAccountCompany } from "@entities/account";
import { getCompanyEmployeesQueryOptions } from "@entities/company/api/getCompanyEmployees";
import { EmployeeModel } from "@entities/employee";

import { CellActions } from "./CellActions";
import sx from "./EmployeesListWidget.sx";
import { Header } from "./Header";
import { HeaderActions } from "./HeaderActions";

const columnHelper = createColumnHelper<EmployeeModel>();

const columns = [
    columnHelper.display({
        id: "username",
        cell: (info) => info.row.original.user.username,
    }),
    columnHelper.display({
        id: "name",
        cell: (info) => {
            const { name, surname, patronymic } = info.row.original;
            return `${name} ${surname ?? ""} ${patronymic ?? ""}`;
        },
    }),
    columnHelper.display({
        id: "email",
        cell: (info) => info.row.original.user.email,
    }),
    columnHelper.display({
        id: "actions",
        cell: CellActions,
        header: HeaderActions,
    }),
];

export const EmployeesListWidget = () => {
    const company = useAccountCompany();

    const { data: employees } = useQuery(getCompanyEmployeesQueryOptions(company?.uuid));

    const [data, setData] = useState<EmployeeModel[]>([]);

    useEffect(() => {
        if (employees) {
            setData(employees.items);
        }
    }, [employees]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        columnResizeMode: "onChange",
    });

    // console.log("render");

    return (
        <div className="p-2">
            <Box sx={sx.table}>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Box sx={sx.tr} key={headerGroup.id}>
                        {headerGroup.headers.map((headerProps) => (
                            <Header {...headerProps} key={headerProps.id} />
                        ))}
                    </Box>
                ))}

                {table.getRowModel().rows.map((row) => (
                    <Box sx={sx.tr} key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <Box sx={{ ...sx.td, width: cell.column.getSize() }} key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
        </div>
    );
};
