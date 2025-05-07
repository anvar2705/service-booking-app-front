import { useCallback, useMemo, useState } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    PaginationState,
    RowData,
    RowSelectionState,
    SortingState,
    TableOptions,
    useReactTable,
} from "@tanstack/react-table";

import { helpers } from "@shared/utils";

import { TableProps } from "../types";
import { getRowIdDefault, getRowSelectionColumn } from "../utils";

export const useTable = <RecordType extends RowData, QueryArg>(props: TableProps<RecordType, QueryArg>) => {
    const {
        columns: columnsFromProps,
        rows,
        loading,
        onRefetch,
        useQuery,
        queryArg,
        queryOptions,
        getRowId: getRowIdFromProps,
        checkboxSelection = false,
        disableColumnReorder,
        paginationModel,
        onPaginationModelChange,
        sortingModel,
        onSortingModelChange,
        columnFiltersModel,
        onColumnFiltersModelChange,
        rowSelectionModel,
        onRowSelectionModelChange,
    } = props;

    const columns = useMemo(
        () =>
            [checkboxSelection ? getRowSelectionColumn() : undefined, ...columnsFromProps].filter(
                Boolean,
            ) as ColumnDef<RecordType>[],
        [checkboxSelection, columnsFromProps],
    );

    const getRowId = getRowIdFromProps ? getRowIdFromProps : (getRowIdDefault as TableOptions<RecordType>["getRowId"]);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnOrder, setColumnOrder] = useState<string[]>(columns.map((c) => c.id!));
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

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
        getRowId,
        enableRowSelection: true,
        enableMultiRowSelection: checkboxSelection,
        manualPagination: true,
        manualSorting: true,
        rowCount: data?.total ?? 0,
        onPaginationChange: onPaginationModelChange ?? setPagination,
        onSortingChange: onSortingModelChange ?? setSorting,
        onColumnFiltersChange: onColumnFiltersModelChange ?? setColumnFilters,
        onColumnOrderChange: setColumnOrder,
        onRowSelectionChange: onRowSelectionModelChange ?? setRowSelection,
        columnResizeMode: "onChange",
        state: {
            pagination: paginationModel ?? pagination,
            sorting: sortingModel ?? sorting,
            columnFilters: columnFiltersModel ?? columnFilters,
            columnOrder,
            rowSelection: rowSelectionModel ?? rowSelection,
        },
        meta: {
            setSorting: onSortingModelChange ?? setSorting,
            columnFilters: columnFiltersModel ?? columnFilters,
            setColumnFilters: onColumnFiltersModelChange ?? setColumnFilters,
            setColumnOrder,
            checkboxSelection,
            disableColumnReorder,
        },
    });

    return {
        table,
    };
};
