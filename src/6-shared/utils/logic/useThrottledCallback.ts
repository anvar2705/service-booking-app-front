import { type DependencyList, useLayoutEffect, useMemo, useRef } from "react";

import { throttle } from "./throttle";

type ThrottleParams = Parameters<typeof throttle>;

const emptyDependencies: DependencyList = [];

const defaultWait = 300;

export const useThrottledCallback = <TCallback extends ThrottleParams[0]>(
    fn: TCallback,
    dependencies: DependencyList = emptyDependencies,
    wait: number = defaultWait,
) => {
    const fnRef = useRef(fn);
    fnRef.current = fn;

    const throttled = useMemo(() => {
        return throttle<TCallback>(fnRef.current, wait);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wait, ...dependencies]);

    useLayoutEffect(
        () => () => {
            throttled.flush();
        },
        [throttled],
    );

    return throttled;
};
