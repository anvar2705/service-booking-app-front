import type { NonEmptyArray, NonEmptyString } from "../types";

export const noop = () => undefined as void;

export const emptyArray = Object.freeze<readonly unknown[]>([]);

export const getEmptyArray = <T>() => emptyArray as T;

export function isNonEmptyArray<T>(arr: T[]): arr is NonEmptyArray<T> {
    return arr.length > 0;
}

export const identity = <T>(arg: T) => arg;

export function extractQueryString(path: string, extraParams = "") {
     
    const [, baseURL, search = ""] = /([^?]*)(\?.*)?/.exec(path) ?? [];
    return [
        baseURL,
         
        `${search}${extraParams ? (search ? "&" : "?") : ""}${extraParams}`,
    ];
}

export function reload() {
    window.location.reload();
}

export function isNonEmptyString(s: string): s is NonEmptyString {
    return s !== "";
}

// prevent exporting types
export {};
