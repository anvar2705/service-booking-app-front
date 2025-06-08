import type { ElementType, ReactNode } from "react";
import type {
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    AutocompleteProps,
    AutocompleteValue,
    TextFieldProps,
} from "@mui/material";

import type { Override, WithOptionalProp } from "@shared/utils";

export type SelectProps<
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends ElementType,
> = Pick<TextFieldProps, "error" | "variant" | "required"> &
    WithOptionalProp<
        Override<
            AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
            {
                onChange?: (
                    value: AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo>,
                    reason: AutocompleteChangeReason,
                    details?: AutocompleteChangeDetails<Value>,
                ) => void;
            }
        >,
        "renderInput"
    > & {
        label?: ReactNode;
        helperText?: ReactNode;
    };

export type SelectQueryHookOptions = {
    enabled?: boolean;
};

export type SelectQueryHook<QueryArg, Value> = (
    queryArg?: QueryArg,
    queryOptions?: SelectQueryHookOptions,
) => {
    data: Value[];
    isFetching: boolean;
};

export type SelectQueryAdditionalProps<QueryArg, Value> = {
    useQuery: SelectQueryHook<QueryArg, Value>;
    queryOptions?: SelectQueryHookOptions;
    getQueryArg?: (search: string) => QueryArg;
    remoteFilterDelay?: number;
};

export type SelectQueryEnricherProps<
    QueryArg,
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends ElementType,
> = Pick<
    SelectProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    "value" | "onChange" | "filterOptions" | "onBlur"
> &
    SelectQueryAdditionalProps<QueryArg, Value> & {
        render: (
            props: Pick<
                SelectProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
                | "value"
                | "onChange"
                | "options"
                | "loading"
                | "filterOptions"
                | "inputValue"
                | "onInputChange"
                | "open"
                | "onOpen"
                | "onClose"
                | "onBlur"
            >,
        ) => ReactNode;
        onDataLoaded?: (data: Value[], debouncedInputValue: string) => void;
    };

/**
 * If you pass 'getQueryArg' prop and SelectQuery is not free solo, you have to pass 'isOptionEqualToValue' prop,
 * because options object links will be changed, and comparison of value object and appropriate object in options
 * will return false
 * */
export type SelectQueryProps<
    QueryArg,
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends ElementType,
> = Omit<
    SelectProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    "options" | "loading" | "open" | "onOpen" | "onClose" | "inputValue" | "onInputChange"
> &
    SelectQueryAdditionalProps<QueryArg, Value>;
