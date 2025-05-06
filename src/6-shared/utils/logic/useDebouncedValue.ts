import { useEffect, useState } from "react";

import { useDebounce } from "./useDebounce";

export function useDebouncedValue<ValueType>(value: ValueType, delay: number = 1000, initialValue?: ValueType) {
    const [storedValue, setStoredValue] = useState(initialValue ?? value);

    const debouncedSetStoredValue = useDebounce(setStoredValue, delay);

    useEffect(() => {
        debouncedSetStoredValue(value);
    }, [debouncedSetStoredValue, value]);

    return storedValue;
}
