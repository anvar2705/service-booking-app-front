import { useCallback, useState } from "react";
import {
    ColumnFiltersState,
    getCoreRowModel,
    PaginationState,
    RowData,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import { helpers } from "@shared/utils";

import { TableProps } from "../types";

export const useTable = <RecordType extends RowData, QueryArg>(props: TableProps<RecordType, QueryArg>) => {
    const { columns, rows, loading, onRefetch, useQuery, queryArg, queryOptions } = props;

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnOrder, setColumnOrder] = useState<string[]>(columns.map((c) => c.id!));

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
        onColumnOrderChange: setColumnOrder,
        columnResizeMode: "onChange",
        state: {
            pagination,
            sorting,
            columnFilters,
            columnOrder,
        },
        meta: {
            setSorting,
            columnFilters,
            setColumnFilters,
            setColumnOrder,
        },
    });

    return {
        table,
    };
};
