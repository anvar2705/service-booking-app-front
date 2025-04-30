import { useCallback } from "react";
import { Box } from "@mui/material";
import {
    flexRender,
    getCoreRowModel,
    // getFilteredRowModel,
    // getPaginationRowModel,
    // getSortedRowModel,
    RowData,
    useReactTable,
} from "@tanstack/react-table";

import { helpers } from "@shared/utils";

import { TableProps } from "../types";

import { Header } from "./Header";
import sx from "./Table.sx";

export const Table = <TData extends RowData, QueryArg>(props: TableProps<TData, QueryArg>) => {
    const { columns, rows, loading, onRefetch, useQuery, queryArg, queryOptions } = props;

    const localHook = useCallback(
        () => ({
            data: {
                items: rows ?? [],
                total: rows?.length ?? 0,
                offset: 0,
            },
            isFetching: loading,
            refetch: onRefetch ?? helpers.noop,
            error: undefined,
        }),
        [loading, onRefetch, rows],
    );

    const useTableQuery = useQuery ?? localHook;

    const { data } = useTableQuery({ arg: queryArg, page: 1, page_size: 10 }, queryOptions);

    const table = useReactTable({
        data: data.items,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // getFilteredRowModel: getFilteredRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        // getSortedRowModel: getSortedRowModel(),
        columnResizeMode: "onChange",
    });

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
