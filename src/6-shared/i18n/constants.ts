import { enUS as coreEnUS, ruRU as coreRuRU } from "@mui/material/locale";
import { enUS as xDataGridEnUS, ruRU as xDataGridRuRU } from "@mui/x-data-grid/locales";
import { enUS as xDataPickersEnUS, ruRU as xDataPickersRuRU } from "@mui/x-date-pickers/locales";

export const LanguageNameEnum = Object.freeze({
    RU: "ru",
    EN: "en",
} as const);

export const NamespaceEnum = Object.freeze({
    SHARED: "shared",
    ZOD: "zod",
    AUTHENTICATION: "authentication",
    EMPLOYEE: "employee",
    SERVICE: "service",
} as const);

export const LocaleEnum = Object.freeze({
    [LanguageNameEnum.RU]: [xDataPickersRuRU, xDataGridRuRU, coreRuRU],
    [LanguageNameEnum.EN]: [xDataPickersEnUS, xDataGridEnUS, coreEnUS],
} as const);
