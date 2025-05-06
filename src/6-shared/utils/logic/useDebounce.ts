import { useRef } from "react";

import { TimeoutId } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce(cb: (...args: any[]) => void, delay: number = 1000) {
    const timeoutId = useRef<TimeoutId | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (...args: any[]) {
        if (timeoutId.current) {
            // This check is not strictly necessary
            clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => cb(...args), delay);
    };
}
