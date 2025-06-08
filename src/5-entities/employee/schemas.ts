import { z } from "zod";

import { PasswordSchema } from "@shared/authentication";

export const BaseEmployeeSchema = z.object({
    username: z.string(),
    name: z.string(),
    surname: z.string().nullish(),
    email: z.string().email().nullish(),
});

export const NewEmployeeSchema = BaseEmployeeSchema.and(PasswordSchema);

export const EmployeeSchema = BaseEmployeeSchema.and(
    z.object({
        id: z.coerce.number(),
    }),
);
