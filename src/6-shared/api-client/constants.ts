export const BASE_URL = "/api/";

export const ACCESS_TOKEN_EXPIRE_CHECK_TIMEOUT = 10 /* seconds */ * 1000; /* milliseconds */
export const ACCESS_TOKEN_STORAGE_SEPARATOR = "...";
export const ACCESS_TOKEN_SESSION_KEY = "ACCESS_TOKEN";

export const STRONG_ERROR_MESSAGE_DURATION = 5000;

export const DEFAULT_STALE_TIME = 3 /* minutes */ * 60 /* seconds */ * 1000; /* milliseconds */

export const TagTypesEnum = Object.freeze({
    ACCESS_TOKEN: "ACCESS_TOKEN",
    USER: "USER",
    ROLE: "ROLE",
} as const);

export const tagTypes = Object.values(TagTypesEnum);
