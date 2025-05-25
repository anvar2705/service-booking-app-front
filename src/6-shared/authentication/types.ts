import type { TypeOf } from "zod";

import type { InitializationStatusEnum } from "./constants";
import type { SignInSchema, SignUpSchema } from "./schemas";

export type InitializationStatus = (typeof InitializationStatusEnum)[keyof typeof InitializationStatusEnum];

export type SignInFormValues = TypeOf<typeof SignInSchema>;

export type SignUpFormValues = TypeOf<typeof SignUpSchema>;
