export { axiosInstance } from "./axiosInstance";
export { queryClient } from "./queryClient";

export { buildQueryHook } from "./logic/buildQueryHook";
export { buildMutationHook } from "./logic/buildMutationHook";
export { accessTokenStorage } from "./logic/access-token/accessTokenStorage";
export { generateAccessTokenExpire } from "./logic/access-token/generateAccessTokenExpire";

export type {
    BuildQueryHookResult,
    LazyTanstackQueryHook,
    AccessTokenData,
    Token,
    TokenType,
    AppTagType,
} from "./types";

export * from "./constants";
