import type { PropsWithChildren } from "react";

import { SnackbarProvider } from "notistack";

import { ErrorBoundary } from "@shared/components/ErrorBoundary";
import { I18nProvider, LanguageNameEnum, useI18n } from "@shared/i18n";
import { ThemeProvider } from "@shared/theme";

import { ReactQueryProvider } from "./ReactQueryProvider";
import { RouterProvider } from "@shared/routes";
import { DateLocalizationProvider } from "@shared/components/DateLocalizationProvider";

function DateLocalizationProviderWithLang({ children }: PropsWithChildren) {
    const i18n = useI18n();
    return <DateLocalizationProvider lang={i18n.language || LanguageNameEnum.RU}>{children}</DateLocalizationProvider>;
}

export function Providers({ children }: PropsWithChildren) {
    return (
        <RouterProvider>
            <ErrorBoundary>
                <SnackbarProvider>
                    <ReactQueryProvider>
                        <I18nProvider>
                            <ThemeProvider>
                                <DateLocalizationProviderWithLang>{children}</DateLocalizationProviderWithLang>
                            </ThemeProvider>
                        </I18nProvider>
                    </ReactQueryProvider>
                </SnackbarProvider>
            </ErrorBoundary>
        </RouterProvider>
    );
}
