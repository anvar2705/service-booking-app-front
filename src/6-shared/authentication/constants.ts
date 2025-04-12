import { type AccountModel } from "./types";

export const InitializationStatusEnum = Object.freeze({
    CREATE_SUPER_USER: "create_super_user",
    COMPLETE: "complete",
} as const);

export const defaultAccountData: AccountModel = {
    status: InitializationStatusEnum.COMPLETE,
    user: null,
    permissions: null,
};

export const STATUS_POLLING_INTERVAL = 1 /* minutes */ * 60 /* seconds */ * 1000; /* milliseconds */

export const LoginTypeEnum = Object.freeze({
    LOGIN: "login",
    DOMAIN: "domain",
} as const);

export const MIN_LOGIN_LENGTH = 3;
export const MAX_LOGIN_LENGTH = 30;
export const MIN_PASSWORD_LENGTH = 3;
export const MAX_PASSWORD_LENGTH = 30;

export const LoginSchemaFieldNameEnum = Object.freeze({
    LOGIN: "login",
    EMAIL: "email",
    PASSWORD_OLD: "password_old",
    PASSWORD: "password",
    PASSWORD_CONFIRMATION: "password_confirmation",
    DOMAIN: "domain",
} as const);
