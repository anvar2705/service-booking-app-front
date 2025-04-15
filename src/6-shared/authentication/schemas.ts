import z from "zod";

import { withPasswordRefine } from "./logic/withPasswordRefine";
import {
    LoginSchemaFieldNameEnum,
    MAX_LOGIN_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_LOGIN_LENGTH,
    MIN_PASSWORD_LENGTH,
} from "./constants";

export const LoginSchema = z.object({
    [LoginSchemaFieldNameEnum.LOGIN]: z.string().min(MIN_LOGIN_LENGTH).max(MAX_LOGIN_LENGTH),
});

export const EmailSchema = z.object({
    [LoginSchemaFieldNameEnum.EMAIL]: z.string().email(),
});

export const PasswordSchema = z.object({
    [LoginSchemaFieldNameEnum.PASSWORD]: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
});

export const PasswordConfirmationSchema = PasswordSchema.extend({
    [LoginSchemaFieldNameEnum.PASSWORD_CONFIRMATION]: z.string().min(MIN_PASSWORD_LENGTH),
});

export const ChangePasswordSchema = PasswordConfirmationSchema.extend({
    [LoginSchemaFieldNameEnum.PASSWORD_OLD]: z.string().min(MIN_PASSWORD_LENGTH),
});

export const PasswordConfirmationSchemaWithRefine = withPasswordRefine(PasswordConfirmationSchema);
export const ChangePasswordSchemaWithRefine = withPasswordRefine(ChangePasswordSchema);

export const BaseLoginSchema = LoginSchema.and(PasswordSchema);
