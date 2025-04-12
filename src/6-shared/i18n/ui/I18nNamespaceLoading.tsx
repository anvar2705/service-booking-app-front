import { type PropsWithChildren, useEffect, useState } from "react";

// import { useMainLoading } from "@rusiem-ui/mui-loading";

import { useI18n } from "../logic/useI18n";

export function I18nNamespaceLoading({ ns, children }: PropsWithChildren<{ ns: string | readonly string[] }>) {
    const i18n = useI18n();
    const [isLoading, setIsLoading] = useState(true);

    // useMainLoading(isLoading, { tip: i18n.t("localizationLoading") });

    useEffect(() => {
        void i18n.loadNamespaces(ns).finally(() => {
            setIsLoading(false);
        });
    }, [i18n, ns]);

    return isLoading ? null : children;
}
