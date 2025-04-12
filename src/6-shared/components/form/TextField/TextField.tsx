import { type TextFieldVariants, TextField as MuiTextField } from "@mui/material";
import { type FieldPath, type FieldValues, Controller, useFormContext } from "react-hook-form";

import type { TextFieldProps } from "./types";

export function TextField<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
    Variant extends TextFieldVariants = TextFieldVariants,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TContext = any,
>(props: TextFieldProps<TFieldValues, TName, Variant>) {
    const {
        name,
        rules,
        shouldUnregister,
        defaultValue,
        control: controlProp,
        onChange,
        onBlur,
        helperText,
        ...textFieldProps
    } = props;

    const { control } = useFormContext<TFieldValues, TContext, TFieldValues>();

    return (
        <Controller<TFieldValues, TName>
            control={controlProp ?? control}
            name={name}
            rules={rules}
            shouldUnregister={shouldUnregister}
            defaultValue={defaultValue}
            render={(props) => {
                const { field, fieldState } = props;
                const { error } = fieldState;
                const { value = "", ref, onChange: fieldOnChange, onBlur: fieldOnBlur, ...fieldProps } = field;

                return (
                    <MuiTextField
                        {...textFieldProps}
                        {...fieldProps}
                        onChange={(...args) => {
                            fieldOnChange?.(...args);
                            onChange?.(...args);
                        }}
                        onBlur={(...args) => {
                            fieldOnBlur?.();
                            onBlur?.(...args);
                        }}
                        inputRef={ref}
                        value={value}
                        error={Boolean(error) || undefined}
                        helperText={error?.message ?? helperText}
                        required={textFieldProps.required ?? Boolean(rules?.required)}
                    />
                );
            }}
        />
    );
}
