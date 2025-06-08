export const BASE_URL = "/api/";

export const ACCESS_TOKEN_EXPIRE_CHECK_TIMEOUT = 10 /* seconds */ * 1000; /* milliseconds */
export const ACCESS_TOKEN_STORAGE_SEPARATOR = "...";
export const ACCESS_TOKEN_SESSION_KEY = "ACCESS_TOKEN";
export const REFRESH_TOKEN_SESSION_KEY = "REFRESH_TOKEN";

export const STRONG_ERROR_MESSAGE_DURATION = 5000;

export const DEFAULT_STALE_TIME = 3 /* minutes */ * 60 /* seconds */ * 1000; /* milliseconds */

export const LIST_TAG_TYPE_ID = "LIST_TAG_TYPE_ID";

export const TagTypesEnum = Object.freeze({
    ACCESS_TOKEN: "ACCESS_TOKEN",
    REFRESH_TOKEN: "REFRESH_TOKEN",
    USER: "USER",
    ROLE: "ROLE",
    ACCOUNT: "ACCOUNT",
    EMPLOYEE: "EMPLOYEE",
    EMPLOYEE_SERVICES: "EMPLOYEE_SERVICES",
    SERVICE: "SERVICE",
    COMPANY: "COMPANY",
    COMPANY_EMPLOYEE: "COMPANY_EMPLOYEE",
} as const);

export const tagTypes = Object.values(TagTypesEnum);
