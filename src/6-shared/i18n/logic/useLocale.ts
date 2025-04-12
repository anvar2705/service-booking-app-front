import { useContext } from "react";

import { localeContext } from "./context";

export function useLocale() {
    return useContext(localeContext);
}
