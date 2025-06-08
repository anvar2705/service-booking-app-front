import { z } from "zod";

export const NewServiceSchema = z
    .object({
        name: z.string().min(1),
        price_from: z.coerce.number(),
        price_to: z.coerce.number().nullable().default(null),
        duration: z.coerce.number(),
        company_uuid: z.string().uuid(),
    })
    .refine((data) => (data.price_to !== null ? data.price_from <= data.price_to : false), {
        params: { i18n: "service:form.errors.priceToLowerThenPriceFrom" },
        path: ["price_to"],
    });

export const ServiceSchema = NewServiceSchema.and(
    z.object({
        uuid: z.string().uuid(),
    }),
);
