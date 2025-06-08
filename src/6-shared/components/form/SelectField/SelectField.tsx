import { type ElementType } from "react";
import { type FieldPath, type FieldValues } from "react-hook-form";
import { type ChipTypeMap } from "@mui/material";

import { Select } from "../../select";

import { SelectFieldEnricher } from "./SelectFieldEnricher";
import type { SelectFieldProps } from "./types";

export function SelectField<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
    Value,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false,
    ChipComponent extends ElementType = ChipTypeMap["defaultComponent"],
>(props: SelectFieldProps<TFieldValues, TName, Value, Multiple, DisableClearable, FreeSolo, ChipComponent>) {
    const {
        idProp,
        // UseControllerProps
        name,
        rules,
        shouldUnregister,
        defaultValue,
        control,
        disabled,
        // SelectProps
        freeSolo,
        multiple,
        options,
        required,
        onChange,
        helperText,
        ...selectProps
    } = props;

    return (
        <SelectFieldEnricher<TFieldValues, TName, Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
            idProp={idProp}
            name={name}
            rules={rules}
            shouldUnregister={shouldUnregister}
            defaultValue={defaultValue}
            control={control}
            disabled={disabled}
            freeSolo={freeSolo}
            multiple={multiple}
            options={options}
            required={required}
            helperText={helperText}
            onChange={onChange}
            renderField={(fieldProps) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { isValueNotFounded, ...restFieldProps } = fieldProps;
                return <Select {...selectProps} {...restFieldProps} />;
            }}
        />
    );
}
