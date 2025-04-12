import type { TypeOf } from "zod";

import type { InitializationStatusEnum } from "./constants";
import type { BaseLoginSchema, PasswordConfirmationSchemaWithRefine } from "./schemas";

export type InitializationStatus = (typeof InitializationStatusEnum)[keyof typeof InitializationStatusEnum];

export type PasswordFormValues = TypeOf<typeof PasswordConfirmationSchemaWithRefine>;

export type LoginFormValues = TypeOf<typeof BaseLoginSchema>;
