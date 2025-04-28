import { z } from "zod";

import { PasswordSchema } from "@shared/authentication";

export const EmployeeSchema = z.object({
    username: z.string(),
    name: z.string(),
    surname: z.string().nullish(),
    email: z.string().email().nullish(),
});

export const AddEmployeeSchema = EmployeeSchema.and(PasswordSchema);

export const EditEmployeeSchema = EmployeeSchema.and(
    z.object({
        id: z.coerce.number(),
    }),
);
