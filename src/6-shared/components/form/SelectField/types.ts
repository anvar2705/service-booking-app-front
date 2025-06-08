import type { ElementType, ForwardedRef, ReactElement } from "react";
import type { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";

import type { SelectProps, SelectQueryProps } from "../../select";

type SelectFieldAdditionalProps = {
    idProp?: string;
};

export type SelectFieldProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends ElementType,
> = UseControllerProps<TFieldValues, TName> &
    SelectFieldAdditionalProps &
    SelectProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>;

export type SelectFieldEnricherProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends ElementType,
> = UseControllerProps<TFieldValues, TName> &
    SelectFieldAdditionalProps &
    Pick<
        SelectProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
        "freeSolo" | "multiple" | "options" | "required" | "helperText" | "onChange"
    > & {
        renderField: (
            props: Pick<
                SelectProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
                | "value"
                | "onChange"
                | "options"
                | "disabled"
                | "error"
                | "helperText"
                | "required"
                | "freeSolo"
                | "multiple"
                | "onBlur"
            > & {
                ref: ForwardedRef<HTMLInputElement>;
                isValueNotFounded?: boolean;
            },
        ) => ReactElement;
        allOptions?: Value[];
    };

export type SelectQueryFieldProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
    QueryArg,
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends ElementType,
> = UseControllerProps<TFieldValues, TName> &
    SelectFieldAdditionalProps &
    SelectQueryProps<QueryArg, Value, Multiple, DisableClearable, FreeSolo, ChipComponent>;
