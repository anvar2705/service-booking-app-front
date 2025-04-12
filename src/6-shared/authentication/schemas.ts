import z from "zod";

import {
    LoginSchemaFieldNameEnum,
    LoginTypeEnum,
    MAX_LOGIN_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_LOGIN_LENGTH,
    MIN_PASSWORD_LENGTH,
} from "./constants";
import { withPasswordRefine } from "./logic/withPasswordRefine";

export const LoginSchema = z.object({
    [LoginSchemaFieldNameEnum.LOGIN]: z.string().min(MIN_LOGIN_LENGTH).max(MAX_LOGIN_LENGTH),
});

export const EmailSchema = z.object({
    [LoginSchemaFieldNameEnum.EMAIL]: z.string().email(),
});

export const DomainSchema = z.object({
    [LoginSchemaFieldNameEnum.DOMAIN]: z.string(),
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

const BaseLoginSchema = PasswordSchema.extend({
    // todo: add extra common login attributes
});

export const ByLoginSchema = BaseLoginSchema.and(LoginSchema);
export const ByDomainSchema = BaseLoginSchema.and(LoginSchema).and(DomainSchema);

export const LoginSchemasEnum = Object.freeze({
    [LoginTypeEnum.LOGIN]: ByLoginSchema,
    [LoginTypeEnum.DOMAIN]: ByDomainSchema,
} as const);
