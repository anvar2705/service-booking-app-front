import { type ElementType, type ForwardedRef, forwardRef } from "react";
import type { ChipTypeMap } from "@mui/material";

import { Select } from "../Select/Select";
import type { SelectQueryProps } from "../types";

import { SelectQueryEnricher } from "./SelectQueryEnricher";

function SelectQueryComponent<
    QueryArg,
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends ElementType,
>(
    props: SelectQueryProps<QueryArg, Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    ref: ForwardedRef<HTMLInputElement>,
) {
    const {
        value,
        onChange,
        onBlur,
        filterOptions,
        useQuery,
        queryOptions,
        getQueryArg,
        remoteFilterDelay,
        ...selectProps
    } = props;

    return (
        <SelectQueryEnricher
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            filterOptions={filterOptions}
            useQuery={useQuery}
            queryOptions={queryOptions}
            getQueryArg={getQueryArg}
            remoteFilterDelay={remoteFilterDelay}
            render={(enricherProps) => <Select {...selectProps} {...enricherProps} ref={ref} />}
        />
    );
}

export const SelectQuery = forwardRef(SelectQueryComponent) as <
    QueryArg,
    Value,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false,
    ChipComponent extends ElementType = ChipTypeMap["defaultComponent"],
>(
    props: SelectQueryProps<QueryArg, Value, Multiple, DisableClearable, FreeSolo, ChipComponent> & {
        ref?: ForwardedRef<HTMLInputElement>;
    },
) => ReturnType<typeof SelectQueryComponent<QueryArg, Value, Multiple, DisableClearable, FreeSolo, ChipComponent>>;
