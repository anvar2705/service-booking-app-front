import { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
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
import { IconButton } from "@shared/components/buttons/IconButton";

import sx from "./EmployeesListWidget.sx";
const columnHelper = createColumnHelper<EmployeeModel>();

const columns = [
    columnHelper.accessor("user.username", {
        cell: (info) => info.getValue(),
        header: () => <span>Username</span>,
    }),
    columnHelper.accessor("name", {
        cell: (info) => {
            const { name, surname, patronymic } = info.row.original;
            return `${name} ${surname} ${patronymic ?? ""}`;
        },
        header: () => <span>Name</span>,
    }),
    columnHelper.accessor("user.email", {
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
    }),
    columnHelper.display({
        id: "actions",
        cell: () => (
            <Box>
                <IconButton color="primary" title="Редактировать">
                    <EditOutlinedIcon />
                </IconButton>
                <IconButton color="error" title="Удалить сотрудника">
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </Box>
        ),
        header: "",
    }),

    // columnHelper.accessor("age", {
    //     header: () => "Age",
    //     cell: (info) => info.renderValue(),
    //     footer: (info) => info.column.id,
    // }),
    // columnHelper.accessor("visits", {
    //     header: () => <span>Visits</span>,
    //     footer: (info) => info.column.id,
    // }),
    // columnHelper.accessor("status", {
    //     header: "Status",
    //     footer: (info) => info.column.id,
    // }),
    // columnHelper.accessor("progress", {
    //     header: "Profile Progress",
    //     footer: (info) => info.column.id,
    // }),
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
                        {headerGroup.headers.map((header) => (
                            <Box sx={{ ...sx.th, width: header.getSize() }} key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                {header.column.getCanSort() && (
                                    <IconButton onClick={header.column.getToggleSortingHandler()}>x</IconButton>
                                )}
                                {/* {
                                    {
                                        asc: " 🔼",
                                        desc: " 🔽",
                                    }[header.column.getIsSorted()]
                                } */}
                                <Box
                                    sx={sx.resizer}
                                    onMouseDown={header.getResizeHandler()}
                                    onTouchStart={header.getResizeHandler()}
                                />
                            </Box>
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
