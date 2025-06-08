import { type ElementType, type ForwardedRef, forwardRef, useCallback } from "react";
import { Autocomplete, type ChipTypeMap, CircularProgress, TextField } from "@mui/material";

import { CIRCULAR_PROGRESS_SIZE } from "../constants";
import type { SelectProps } from "../types";

function SelectComponent<
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends ElementType,
>(props: SelectProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>, ref: ForwardedRef<HTMLInputElement>) {
    const { error, variant, required, label, helperText, loading, renderInput, onChange, ...restProps } = props;

    return (
        <Autocomplete<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
            {...restProps}
            onChange={(_, newValue, reason, details) => {
                if (onChange) onChange(newValue, reason, details);
            }}
            renderInput={useCallback(
                (params) =>
                    renderInput ? (
                        renderInput(params)
                    ) : (
                        <TextField
                            {...params}
                            inputRef={ref}
                            error={error}
                            label={label}
                            variant={variant}
                            required={required}
                            helperText={helperText}
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loading ? (
                                                <CircularProgress color="inherit" size={CIRCULAR_PROGRESS_SIZE} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                },
                            }}
                        />
                    ),
                [error, helperText, label, loading, ref, renderInput, required, variant],
            )}
        />
    );
}

export const Select = forwardRef(SelectComponent) as <
    Value,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false,
    ChipComponent extends ElementType = ChipTypeMap["defaultComponent"],
>(
    props: SelectProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent> & {
        ref?: ForwardedRef<HTMLInputElement>;
    },
) => ReturnType<typeof SelectComponent<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>>;
