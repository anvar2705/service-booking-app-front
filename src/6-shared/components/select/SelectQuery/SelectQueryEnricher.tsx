import { type ElementType, useEffect, useState } from "react";

import { helpers, useDebouncedValue } from "@shared/utils";

import { INPUT_VALUE_CHANGE_DELAY } from "../constants";
import type { SelectQueryEnricherProps } from "../types";

const { identity } = helpers;

export const SelectQueryEnricher = <
    QueryArg,
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends ElementType,
>(
    props: SelectQueryEnricherProps<QueryArg, Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
) => {
    const {
        value,
        onChange,
        onBlur,
        filterOptions,
        render,
        useQuery,
        queryOptions,
        getQueryArg,
        remoteFilterDelay = INPUT_VALUE_CHANGE_DELAY,
        onDataLoaded,
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const debouncedInputValue = useDebouncedValue(inputValue, remoteFilterDelay);

    const enabled = isOpen || (Array.isArray(value) ? value.length > 0 : Boolean(value)) || queryOptions?.enabled;

    const { data, isFetching } = useQuery(getQueryArg ? getQueryArg(debouncedInputValue) : (undefined as QueryArg), {
        enabled,
    });

    useEffect(() => {
        if (onDataLoaded) onDataLoaded(data, debouncedInputValue);
    }, [data, debouncedInputValue, onDataLoaded]);

    return render({
        value,
        onChange: (...args) => {
            setInputValue("");
            onChange?.(...args);
        },
        options: data,
        loading: isFetching,
        filterOptions: getQueryArg ? identity : filterOptions,
        inputValue: Array.isArray(value) ? inputValue : undefined,
        onInputChange: (_, newInputValue, reason) => {
            // check reason for disable request with init value, if passed getQueryArg prop
            if (reason !== "reset") setInputValue(newInputValue);
        },
        open: isOpen,
        onOpen: () => {
            setIsOpen(true);
        },
        onClose: () => {
            setIsOpen(false);
        },
        onBlur: (...args) => {
            setInputValue("");
            onBlur?.(...args);
        },
    });
};
