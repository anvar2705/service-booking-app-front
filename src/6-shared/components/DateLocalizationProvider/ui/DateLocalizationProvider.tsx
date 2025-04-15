import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

import { DateLocalizationProviderProps } from "../types";

export function DateLocalizationProvider(props: DateLocalizationProviderProps) {
    const { children, lang } = props;

    dayjs.locale(lang);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang}>
            {children}
        </LocalizationProvider>
    );
}
