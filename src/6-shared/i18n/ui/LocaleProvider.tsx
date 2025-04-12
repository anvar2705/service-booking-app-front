import { type PropsWithChildren, useCallback, useEffect, useState } from "react";

import { LanguageNameEnum, LocaleEnum } from "../constants";
import { localeContext } from "../logic/context";
import { useI18n } from "../logic/useI18n";
import type { LanguageName } from "../types";

export function LocaleProvider({ children }: PropsWithChildren) {
    const i18n = useI18n();
    const [locale, setLocale] = useState(LocaleEnum[LanguageNameEnum.RU]);

    const languageChangedHandler = useCallback((lng: LanguageName) => {
        const locale = LocaleEnum[lng];

        if (!locale) {
            throw new ReferenceError("Locale is undefined");
        }

        setLocale(locale);
    }, []);

    useEffect(() => {
        i18n.on("languageChanged", languageChangedHandler);

        return () => {
            i18n.off("languageChanged", languageChangedHandler);
        };
    }, [i18n, languageChangedHandler]);

    return <localeContext.Provider value={locale}>{children}</localeContext.Provider>;
}
