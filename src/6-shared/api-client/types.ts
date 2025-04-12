import { type DefaultError, type QueryKey } from "@tanstack/react-query";

import type { TagTypesEnum } from "./constants";
import { type buildQueryHook } from "./logic/buildQueryHook";

export type LazyTanstackQueryHook<Data> = () => () => Promise<Data>;

export type BuildQueryHookResult<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
> = ReturnType<typeof buildQueryHook<TQueryFnData, TError, TData, TQueryKey>>;

export type Token = string;
export type TokenType = string;
export type AccessTokenData = { access_token: Token; token_type: TokenType };

export type AppTagType = (typeof TagTypesEnum)[keyof typeof TagTypesEnum];
