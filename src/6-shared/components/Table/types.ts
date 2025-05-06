import { Dispatch, SetStateAction } from "react";
import { ColumnDef, ColumnFiltersState, ColumnSort, RowData, SortingState } from "@tanstack/react-table";
import { TypeOf } from "zod";

import { FiltersSchema } from "./schemas";

export type TableData<T = unknown> = {
    items: T[];
    total: number;
    offset: number;
};

export type TableRequestParams<QueryArg = void> = {
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
    rows: never;
    onRefetch?: never;
};

export type FetcherWithoutQueryProps<RecordType> = {
    useQuery?: never;
    resolver?: never;
    queryArg?: never;
    queryOptions?: never;
    queryTransformParams?: never;
    rows: RecordType[];
    onRefetch?: () => void;
};

export type TableProps<RecordType extends RowData, QueryArg = void> = {
    columns: ColumnDef<RecordType>[];
    loading?: boolean;
} & (FetcherWithQueryProps<RecordType, QueryArg> | FetcherWithoutQueryProps<RecordType>);

export type FilterFormValues = TypeOf<typeof FiltersSchema>;

declare module "@tanstack/table-core" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        setSorting: Dispatch<SetStateAction<SortingState>>;
        columnFilters: ColumnFiltersState;
        setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
    }
}
