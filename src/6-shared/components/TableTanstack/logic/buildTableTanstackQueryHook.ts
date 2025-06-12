import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";

import { LIST_TAG_TYPE_ID } from "@shared/api-client";
import { helpers, param } from "@shared/utils";

import type { QueryOptions, TableData, TableQueryHook, TableRequestParams } from "../types";

type Transform<ModelType, RecordType = ModelType> = (model: ModelType) => RecordType;

const { extractQueryString, identity } = helpers;

const queryFn = <ModelType, RecordType = ModelType, QueryArg = void>(
    axiosInstance: AxiosInstance,
    url: string | ((arg?: QueryArg) => string),
    params: TableRequestParams<QueryArg>,
    transform?: Transform<ModelType, RecordType>,
) => {
    const { arg, ...tableParams } = params;

    return async () => {
        const urlStr = typeof url === "string" ? url : url(arg);
        const [path, query] = extractQueryString(urlStr, param(tableParams, false));

        const response = await axiosInstance.get<TableData<ModelType>>(`${path}${query}`);

        return {
            ...response.data,
            items: response.data.items.map(transform ?? (identity as Transform<ModelType, RecordType>)),
        };
    };
};

export const buildTableTanstackQueryHook =
    <TagType extends string, ModelType, RecordType = ModelType, QueryArg = void>(
        axiosInstance: AxiosInstance,
        url: string | ((arg?: QueryArg) => string),
        tagType: TagType,
        transform?: Transform<ModelType, RecordType>,
    ): TableQueryHook<RecordType, QueryArg> =>
    (params: TableRequestParams<QueryArg>, queryOptions?: QueryOptions) => {
        const {
            enabled = true,
            refetchOnMount = true,
            refetchInterval,
            refetchIntervalInBackground,
        } = queryOptions ?? {};

        const { data, isFetching, refetch, error } = useQuery({
            queryFn: queryFn(axiosInstance, url, params, transform),
            queryKey: [tagType, LIST_TAG_TYPE_ID, params],
            placeholderData: keepPreviousData,
            enabled,
            refetchOnMount: refetchOnMount ? "always" : true,
            refetchInterval,
            refetchIntervalInBackground,
        });

        return { data, isFetching, refetch, error };
    };
