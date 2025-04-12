import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldValues, useForm as useFormRHF, type UseFormReturn } from "react-hook-form";
import type { ZodSchema } from "zod";

import type { FormSchemaValues, UseFormProps } from "../types";

export function useForm<Schema extends ZodSchema, TFieldValues extends FormSchemaValues<FieldValues, Schema>, TContext>(
    props: UseFormProps<Schema, TFieldValues, TContext>,
): UseFormReturn<TFieldValues, TContext, TFieldValues> {
    const { schema, ...formConfig } = props;

    return useFormRHF<TFieldValues, TContext, TFieldValues>({
        ...formConfig,
        resolver: schema ? zodResolver(schema) : undefined,
    });
}
