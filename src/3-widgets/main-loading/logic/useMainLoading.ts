import { useEffect } from "react";

import { setMainLoading } from "./store";

export const useMainLoading = (value: boolean) => {
    useEffect(() => {
        setMainLoading(value);

        return () => {
            setMainLoading(false);
        };
    }, [value]);
};
