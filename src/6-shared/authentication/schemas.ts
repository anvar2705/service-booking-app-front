import z from "zod";

import {
    AuthSchemaFieldNameEnum,
    MAX_LOGIN_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_LOGIN_LENGTH,
    MIN_PASSWORD_LENGTH,
} from "./constants";

export const LoginSchema = z.object({
    [AuthSchemaFieldNameEnum.USERNAME]: z.string().min(MIN_LOGIN_LENGTH).max(MAX_LOGIN_LENGTH),
});

export const PasswordSchema = z.object({
    [AuthSchemaFieldNameEnum.PASSWORD]: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
});

export const PasswordConfirmationSchema = PasswordSchema.extend({
    [AuthSchemaFieldNameEnum.PASSWORD_CONFIRMATION]: z.string().min(MIN_PASSWORD_LENGTH),
}).refine((data) => data.password === data.password_confirmation, {
    params: { i18n: "authentication:changePasswordForm.invalidPasswordConfirmation" },
    path: ["password_confirmation"],
});

export const SignInSchema = LoginSchema.and(PasswordSchema);

export const SignUpSchema = LoginSchema.extend({
    [AuthSchemaFieldNameEnum.COMPANY_NAME]: z.string(),
    [AuthSchemaFieldNameEnum.EMAIL]: z.string().email(),
}).and(PasswordConfirmationSchema);
