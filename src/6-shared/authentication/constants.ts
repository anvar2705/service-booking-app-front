export const InitializationStatusEnum = Object.freeze({
    CREATE_SUPER_USER: "create_super_user",
    COMPLETE: "complete",
} as const);

export const STATUS_POLLING_INTERVAL = 1 /* minutes */ * 60 /* seconds */ * 1000; /* milliseconds */

export const MIN_LOGIN_LENGTH = 3;
export const MAX_LOGIN_LENGTH = 30;
export const MIN_PASSWORD_LENGTH = 3;
export const MAX_PASSWORD_LENGTH = 30;

export const LoginSchemaFieldNameEnum = Object.freeze({
    LOGIN: "username",
    EMAIL: "email",
    PASSWORD_OLD: "password_old",
    PASSWORD: "password",
    PASSWORD_CONFIRMATION: "password_confirmation",
} as const);
