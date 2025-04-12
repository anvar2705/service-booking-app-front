import { FALSE_STR, TRUE_STR } from "../constants";

export const localStorage = {
    get: <T extends string | boolean | null>(key: string): T | null => {
        const value = window.localStorage.getItem(key);

        if (value && [TRUE_STR, FALSE_STR].includes(value)) {
            return (value === TRUE_STR) as T | null;
        }

        return value as T | null;
    },
    set: (key: string, value: string | boolean): void => {
        let value_ = value;

        if (typeof value_ === "boolean") {
            value_ = value_ ? TRUE_STR : FALSE_STR;
        }

        window.localStorage.setItem(key, value_);
    },
    remove: (key: string): void => {
        window.localStorage.removeItem(key);
    },
};
