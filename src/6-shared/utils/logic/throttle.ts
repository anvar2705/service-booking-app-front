// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionForThrottling = (...args: readonly any[]) => void;

type ThrottledFunction<F extends FunctionForThrottling> = {
    (...arguments_: Parameters<F> | never[]): ReturnType<F> | undefined;
    readonly isPending: boolean;
    clear: () => void;
    flush: () => void;
    trigger: () => void;
};

export function throttle<F extends FunctionForThrottling, C = unknown>(
    this: C,
    func: F,
    wait = 100,
): ThrottledFunction<F> {
    if (typeof func !== "function") {
        throw new TypeError(`Expected the first parameter to be a function, got \`${typeof func}\`.`);
    }

    if (wait < 0) {
        throw new RangeError("`wait` must not be negative.");
    }

    let isThrottled = false;
    let needExecute = false;

    let storedContext: C | undefined;
    let storedArguments: Parameters<F> | never[];
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const reset = () => {
        isThrottled = false;
        needExecute = false;
        timeoutId = undefined;
        storedContext = undefined;
        storedArguments = [];
    };

    const run = () => {
        const context = storedContext;
        const args = storedArguments;
        const execute = needExecute;

        throttled.clear();

        if (execute) {
            throttled.apply(context, args);
        }
    };

    const throttled = function (this: C, ...args) {
        if (
            storedContext &&
            this !== storedContext &&
            Object.getPrototypeOf(this) === Object.getPrototypeOf(storedContext)
        ) {
            throw new Error("Throttled method called with different contexts of the same prototype.");
        }

        if (isThrottled) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            storedContext = this;
            storedArguments = args;
            needExecute = true;
            return;
        }

        func.apply(this, args);

        isThrottled = true;

        timeoutId = setTimeout(run, wait);
    } as ThrottledFunction<F>;

    Object.defineProperty(throttled, "isPending", {
        get() {
            return isThrottled && needExecute;
        },
    });

    throttled.clear = () => {
        if (!timeoutId) {
            return;
        }

        clearTimeout(timeoutId);
        reset();
    };

    throttled.flush = () => {
        if (!throttled.isPending) {
            return;
        }

        throttled.trigger();
    };

    throttled.trigger = () => {
        if (!isThrottled) {
            return;
        }

        run();
    };

    return throttled;
}
