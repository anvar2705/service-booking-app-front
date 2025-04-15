import { useCallback } from "react";
import { type DefaultError, type QueryKey, useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { queryClient } from "../queryClient";

export const buildQueryHook = <
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    buildQueryHookOptions: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
) => {
    return (
        options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryFn" | "queryKey" | "select">,
    ) => {
        return useQuery({
            ...buildQueryHookOptions,
            ...options,
        });
    };
};

export const buildLazyQueryHook = <
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    buildQueryHookOptions: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
) => {
    return () => {
        return useCallback(() => queryClient.ensureQueryData(buildQueryHookOptions), []);
    };
};
