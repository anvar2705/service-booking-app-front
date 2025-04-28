import { DefaultError, UseMutationOptions as UseMutationOptionsLib } from "@tanstack/react-query";

import type { TagTypesEnum } from "./constants";

export type Token = string;
export type TokensData = { access_token: Token; refresh_token: Token };

export type AppTagType = (typeof TagTypesEnum)[keyof typeof TagTypesEnum];

export type UseMutationOptions<TData = unknown, TVariables = void> = UseMutationOptionsLib<
    TData,
    DefaultError,
    TVariables
>;
