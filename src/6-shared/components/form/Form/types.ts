import type {
    FieldValues,
    UseFormReturn,
    FormProps as RHFFormProps,
    UseFormProps as RHFUseFormProps,
} from "react-hook-form";
import { TypeOf, ZodSchema } from "zod";

export type FormProps<TFieldValues extends FieldValues, TContext> = Omit<
    RHFFormProps<TFieldValues, TFieldValues>,
    "control"
> & {
    formMethods: UseFormReturn<TFieldValues, TContext, TFieldValues>;
};

export type FormSchemaValues<TFieldValues extends FieldValues, Schema extends ZodSchema> = Schema extends ZodSchema
    ? TypeOf<Schema>
    : TFieldValues;

export type UseFormProps<
    Schema extends ZodSchema,
    TFieldValues extends FormSchemaValues<FieldValues, Schema>,
    TContext,
> = RHFUseFormProps<TFieldValues, TContext> & {
    schema?: Schema;
};
