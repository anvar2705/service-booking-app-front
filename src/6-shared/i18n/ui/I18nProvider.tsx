import type { PropsWithChildren } from "react";

import { I18nextProvider, useTranslation } from "react-i18next";
import z from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

import { LocaleProvider } from "./LocaleProvider";
import { NamespaceEnum } from "../constants";
import { i18n } from "../logic/i18n";

export function I18nProvider({ children }: PropsWithChildren) {
    const { t } = useTranslation(NamespaceEnum.ZOD, { i18n });

    z.setErrorMap(
        makeZodI18nMap({
            t,
            handlePath: {
                keyPrefix: "forms",
            },
        }),
    );

    return (
        <I18nextProvider i18n={i18n}>
            <LocaleProvider>{children}</LocaleProvider>
        </I18nextProvider>
    );
}
