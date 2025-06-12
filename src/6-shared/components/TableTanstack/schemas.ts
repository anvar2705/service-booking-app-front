import { z } from "zod";

export const FiltersSchema = z.object({
    filters: z.array(
        z.object({
            id: z.string().min(1),
            value: z.string().min(1),
        }),
    ),
});
