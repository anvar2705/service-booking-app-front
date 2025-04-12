import type { ZodSchema } from "zod";

export const withPasswordRefine = function (schema: ZodSchema) {
    return schema.refine((data) => data.password === data.password_confirmation, {
        params: { i18n: "authentication:changePasswordForm.invalidPasswordConfirmation" },
        path: ["password_confirmation"],
    });
};
