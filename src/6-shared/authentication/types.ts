import type { TypeOf } from "zod";

import type { InitializationStatusEnum, LoginTypeEnum } from "./constants";
import type { ByDomainSchema, ByLoginSchema, PasswordConfirmationSchemaWithRefine } from "./schemas";

export type InitializationStatus = (typeof InitializationStatusEnum)[keyof typeof InitializationStatusEnum];

export type AccountModel = {
    status: InitializationStatus;
    user: ({ id: number; name: string; is_admin: boolean | null } & Record<string, unknown>) | null;
    permissions: (Partial<{ "*": boolean; ALL: boolean }> & Record<string, Record<string, boolean>>) | null;
};

export type LoginType = (typeof LoginTypeEnum)[keyof typeof LoginTypeEnum];

export type PasswordFormValues = TypeOf<typeof PasswordConfirmationSchemaWithRefine>;

export type LoginFormValues = TypeOf<typeof ByLoginSchema | typeof ByDomainSchema>;
