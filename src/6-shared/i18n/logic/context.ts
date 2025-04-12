import { createContext } from "react";

import { LanguageNameEnum, LocaleEnum } from "../constants";

export const localeContext = createContext(LocaleEnum[LanguageNameEnum.RU]);
