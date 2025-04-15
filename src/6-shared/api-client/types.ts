import { type DefaultError, type QueryKey } from "@tanstack/react-query";

import { type buildQueryHook } from "./logic/buildQueryHook";
import type { TagTypesEnum } from "./constants";

export type LazyTanstackQueryHook<Data> = () => () => Promise<Data>;

export type BuildQueryHookResult<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
> = ReturnType<typeof buildQueryHook<TQueryFnData, TError, TData, TQueryKey>>;

export type Token = string;
export type TokensData = { access_token: Token; refresh_token: Token };

export type AppTagType = (typeof TagTypesEnum)[keyof typeof TagTypesEnum];
