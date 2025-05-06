import { useCallback, useState } from "react";
import { Box } from "@mui/material";
import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    PaginationState,
    RowData,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import { helpers } from "@shared/utils";

import { TableProps } from "../types";

import { ColumnHeader } from "./ColumnHeader";
import { Pagination } from "./Pagination";
import sx from "./Table.sx";

export const Table = <TData extends RowData, QueryArg>(props: TableProps<TData, QueryArg>) => {
    const { columns, rows, loading, onRefetch, useQuery, queryArg, queryOptions } = props;

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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

    const { data } = useTableQuery(
        {
            arg: queryArg,
            page: pagination.pageIndex + 1,
            page_size: pagination.pageSize,
            sorting: sorting.length > 0 ? sorting[0] : undefined,
            filters: columnFilters,
        },
        queryOptions,
    );

    const table = useReactTable({
        data: data?.items ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        rowCount: data?.total ?? 0,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        columnResizeMode: "onChange",
        state: {
            pagination,
            sorting,
            columnFilters,
        },
        meta: {
            setSorting,
            columnFilters,
            setColumnFilters,
        },
    });

    return (
        <div className="p-2">
            <Box sx={sx.table}>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Box sx={sx.tr} key={headerGroup.id}>
                        {headerGroup.headers.map((headerProps) => (
                            <ColumnHeader {...headerProps} key={headerProps.id} />
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

                <Pagination table={table} />
            </Box>
        </div>
    );
};
