import type { ElementType } from "react";
import { Controller, type ControllerProps, type FieldPath, type FieldValues, useFormContext } from "react-hook-form";
import type {
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    AutocompleteValue,
    ChipTypeMap,
} from "@mui/material";

import type { SelectFieldEnricherProps } from "./types";

export function SelectFieldEnricher<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
    Value,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false,
    ChipComponent extends ElementType = ChipTypeMap["defaultComponent"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TContext = any,
>(props: SelectFieldEnricherProps<TFieldValues, TName, Value, Multiple, DisableClearable, FreeSolo, ChipComponent>) {
    const {
        renderField,
        idProp = "id",
        allOptions,
        // UseControllerProps
        name,
        rules,
        shouldUnregister,
        defaultValue,
        control: controlProp,
        disabled,
        // SelectProps
        freeSolo,
        multiple,
        options,
        required,
        helperText,
        onChange: onChangeFromProps,
    } = props;

    const { control } = useFormContext<TFieldValues, TContext, TFieldValues>();

    const render: ControllerProps<TFieldValues, TName>["render"] = ({ field, fieldState }) => {
        const { value, onChange } = field;
        const { error } = fieldState;

        let isValueNotFounded;

        const _getValue = (): AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo> => {
            if (value === null || value === undefined) {
                return (multiple ? [] : null) as AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>;
            }

            if (freeSolo) {
                return value;
            }

            if (multiple) {
                const foundedValues = value
                    .map((v: string | number) => {
                        const foundedValueFromOptions = options.find(
                            (option) => (option as Record<string, unknown>)[idProp] === v,
                        );

                        if (foundedValueFromOptions) return foundedValueFromOptions;

                        return allOptions?.find((option) => (option as Record<string, unknown>)[idProp] === v);
                    })
                    .filter(Boolean);

                if (foundedValues.length !== value.length) {
                    isValueNotFounded = true;
                }

                return foundedValues as AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>;
            }

            const foundedValue =
                options.find((option) => (option as Record<string, unknown>)[idProp] === value) ?? null;

            if (value && !foundedValue) {
                isValueNotFounded = true;
            }

            return foundedValue as AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>;
        };

        const _onChange = (
            newValue: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>,
            reason: AutocompleteChangeReason,
            details?: AutocompleteChangeDetails<Value>,
        ) => {
            if (newValue === null || newValue === undefined || Boolean(freeSolo) || typeof newValue !== "object") {
                onChange(newValue);
                onChangeFromProps?.(newValue, reason, details);
                return;
            }

            if (multiple) {
                const newValues = Array.isArray(newValue) ? newValue : [newValue];

                onChange(newValues.map((v) => (v !== null && typeof v === "object" ? v[idProp] : v)));

                onChangeFromProps?.(newValue, reason, details);

                return;
            }

            onChange((newValue as Record<string, unknown>)[idProp] ?? null);
            onChangeFromProps?.(newValue, reason, details);
        };

        return renderField({
            ...field,
            value: _getValue(),
            onChange: _onChange,
            options,
            error: Boolean(error),
            helperText: error?.message ?? helperText,
            required: required ?? Boolean(rules?.required),
            freeSolo,
            multiple,
            isValueNotFounded,
        });
    };

    return (
        <Controller<TFieldValues, TName>
            control={controlProp ?? control}
            name={name}
            rules={rules}
            disabled={disabled}
            shouldUnregister={shouldUnregister}
            defaultValue={defaultValue}
            render={render}
        />
    );
}
