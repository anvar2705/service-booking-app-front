import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import { NamespaceEnum } from "@shared/i18n";
import { ErrorFallbackTranslations } from "../types";

export const useErrorFallbackTranslations = () => {
    const { t } = useTranslation(NamespaceEnum.SHARED, { keyPrefix: "errorBoundary" });

    return useMemo<ErrorFallbackTranslations>(
        () => ({
            resetText: t("resetText"),
            showDetails: t("showDetails"),
            dynamicallyImportedModuleError: {
                title: t("dynamicallyImportedModuleError.title"),
                details: t("dynamicallyImportedModuleError.details"),
                resetText: t("dynamicallyImportedModuleError.resetText"),
            },
        }),
        [t],
    );
};
