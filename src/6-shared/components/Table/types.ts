import { Dispatch, SetStateAction } from "react";
import { PopoverProps, SxProps } from "@mui/material";
import {
    ColumnDef,
    ColumnFiltersState,
    ColumnSort,
    Header as HeaderType,
    OnChangeFn,
    PaginationState,
    Row as RowType,
    RowData,
    RowSelectionState,
    SortingState,
    Table,
    TableOptions,
} from "@tanstack/react-table";
import { TypeOf } from "zod";

import { FiltersSchema } from "./schemas";

export type TableData<T = unknown> = {
    items: T[];
    total: number;
    offset: number;
};

export type TableRequestParams<QueryArg> = {
    arg?: QueryArg;
    page: number;
    page_size: number;
    sorting?: ColumnSort;
    filters?: ColumnFiltersState;
};

export type TableQueryHook<RecordType, QueryArg> = (
    params: TableRequestParams<QueryArg>,
    queryOptions?: QueryOptions,
) => {
    data?: TableData<RecordType>;
    isFetching: boolean;
    refetch: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
};

export type QueryOptions = {
    enabled?: boolean;
    refetchOnMount?: boolean;
    refetchInterval?: number;
    refetchIntervalInBackground?: boolean;
};

export type QueryTransformParams<QueryArg> = (params: TableRequestParams<QueryArg>) => TableRequestParams<QueryArg>;

export type FetcherWithQueryProps<RecordType, QueryArg> = {
    useQuery: TableQueryHook<RecordType, QueryArg>;
    queryOptions?: QueryOptions;
    queryArg?: QueryArg;
    queryTransformParams?: QueryTransformParams<QueryArg>;
    onRefetch?: never;
};

export type FetcherWithoutQueryProps = {
    useQuery?: never;
    resolver?: never;
    queryArg?: never;
    queryOptions?: never;
    queryTransformParams?: never;
    onRefetch?: () => void;
};

export type TableProps<RecordType extends RowData, QueryArg> = (
    | FetcherWithQueryProps<RecordType, QueryArg>
    | FetcherWithoutQueryProps
) & {
    columns: ColumnDef<RecordType>[];
    loading?: boolean;
    rows?: RecordType[];
    getRowId?: TableOptions<RecordType>["getRowId"];
    checkboxSelection?: boolean;
    disableColumnReorder?: boolean;
    paginationModel?: PaginationState;
    onPaginationModelChange?: OnChangeFn<PaginationState>;
    sortingModel?: SortingState;
    onSortingModelChange?: OnChangeFn<SortingState>;
    columnFiltersModel?: ColumnFiltersState;
    onColumnFiltersModelChange?: OnChangeFn<ColumnFiltersState>;
    rowSelectionModel?: RowSelectionState;
    onRowSelectionModelChange?: OnChangeFn<RowSelectionState>;
};

export type FilterFormValues = TypeOf<typeof FiltersSchema>;

declare module "@tanstack/table-core" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        setSorting: Dispatch<SetStateAction<SortingState>>;
        columnFilters: ColumnFiltersState;
        setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
        setColumnOrder: Dispatch<SetStateAction<string[]>>;
        checkboxSelection?: boolean;
        disableColumnReorder?: boolean;
    }
}

export type ColumnHeaderProps<RecordType extends RowData> = HeaderType<RecordType, unknown>;

export type ColumnHeaderMenuProps<RecordType extends RowData> = {
    setIsShowButtons: Dispatch<SetStateAction<boolean>>;
    sx?: SxProps;
} & HeaderType<RecordType, unknown>;

export type ColumnHeaderFilterPopoverProps<RecordType extends RowData> = Pick<PopoverProps, "anchorEl"> &
    HeaderType<RecordType, unknown> & {
        onClose: () => void;
    };

export type ValidRowModel = { id?: string | number; uuid?: string };

export type RowProps<RecordType extends RowData> = RowType<RecordType> & {
    table: Table<RecordType>;
};
