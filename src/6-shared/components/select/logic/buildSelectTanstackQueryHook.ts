import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";

import { EMPTY_DATA, LIST_TAG_TYPE_ID } from "../constants";
import type { SelectQueryHook, SelectQueryHookOptions } from "../types";

export const buildSelectTanstackQueryHook =
    <TagType extends string, QueryArg, Value, ResponseValue = Value[]>(
        axiosInstance: AxiosInstance,
        url: string | ((arg?: QueryArg) => string),
        tagType: TagType,
        select?: (data: ResponseValue) => Value[],
    ): SelectQueryHook<QueryArg, Value> =>
    (queryArg?: QueryArg, queryOptions?: SelectQueryHookOptions) => {
        const queryKey: unknown[] = [tagType, LIST_TAG_TYPE_ID];

        if (queryArg) {
            queryKey.push(queryArg);
        }

        const { data = EMPTY_DATA, isFetching } = useQuery({
            queryFn: async () => {
                const urlStr = typeof url === "string" ? url : url(queryArg);

                const response = await axiosInstance.get<ResponseValue>(urlStr);

                return response.data;
            },
            queryKey,
            placeholderData: keepPreviousData,
            enabled: queryOptions?.enabled ?? false,
            select,
        });

        return { data, isFetching };
    };
