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
    const {
        columns,
        rows,
        loading,
        onRefetch,
        useQuery,
        queryArg,
        queryOptions,
        disableColumnReorder,
        paginationModel,
        onPaginationModelChange,
        sortingModel,
        onSortingModelChange,
        columnFiltersModel,
        onColumnFiltersModelChange,
    } = props;

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
            page: paginationModel ? paginationModel.pageIndex + 1 : pagination.pageIndex + 1,
            page_size: paginationModel ? paginationModel.pageSize : pagination.pageSize,
            sorting:
                sortingModel && sortingModel.length > 0 ? sortingModel[0] : sorting.length > 0 ? sorting[0] : undefined,
            filters: columnFiltersModel ?? columnFilters,
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
        onPaginationChange: onPaginationModelChange ?? setPagination,
        onSortingChange: onSortingModelChange ?? setSorting,
        onColumnFiltersChange: onColumnFiltersModelChange ?? setColumnFilters,
        onColumnOrderChange: setColumnOrder,
        columnResizeMode: "onChange",
        state: {
            pagination: paginationModel ?? pagination,
            sorting: sortingModel ?? sorting,
            columnFilters: columnFiltersModel ?? columnFilters,
            columnOrder,
        },
        meta: {
            setSorting: onSortingModelChange ?? setSorting,
            columnFilters: columnFiltersModel ?? columnFilters,
            setColumnFilters: onColumnFiltersModelChange ?? setColumnFilters,
            setColumnOrder,
            disableColumnReorder,
        },
    });

    return {
        table,
    };
};
