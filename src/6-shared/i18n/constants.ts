import { ruRU as coreRuRU, enUS as coreEnUS } from "@mui/material/locale";
import { ruRU as xDataGridRuRU, enUS as xDataGridEnUS } from "@mui/x-data-grid/locales";
import { ruRU as xDataPickersRuRU, enUS as xDataPickersEnUS } from "@mui/x-date-pickers/locales";

export const LanguageNameEnum = Object.freeze({
    RU: "ru",
    EN: "en",
} as const);

export const NamespaceEnum = Object.freeze({
    SHARED: "shared",
    ZOD: "zod",
    AUTHENTICATION: "authentication",
} as const);

export const LocaleEnum = Object.freeze({
    [LanguageNameEnum.RU]: [xDataPickersRuRU, xDataGridRuRU, coreRuRU],
    [LanguageNameEnum.EN]: [xDataPickersEnUS, xDataGridEnUS, coreEnUS],
} as const);
