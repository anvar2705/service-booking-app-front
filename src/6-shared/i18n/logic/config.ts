import type { InitOptions } from "i18next";
import { type ChainedBackendOptions } from "i18next-chained-backend";
import HttpBackend, { type HttpBackendOptions } from "i18next-http-backend";
import LocalStorageBackend from "i18next-localstorage-backend";

import { LanguageNameEnum, NamespaceEnum } from "../constants";

const isDevelopment = process.env.NODE_ENV !== "production";
const sessionLng = localStorage.getItem("lang") ?? LanguageNameEnum.RU;

export const config: InitOptions<ChainedBackendOptions> = {
    lng: sessionLng,
    fallbackLng: sessionLng,
    supportedLngs: [LanguageNameEnum.RU, LanguageNameEnum.EN],
    load: "languageOnly",
    preload: [sessionLng],

    ns: [NamespaceEnum.SHARED, NamespaceEnum.ZOD],
    defaultNS: NamespaceEnum.SHARED,
    fallbackNS: NamespaceEnum.SHARED,

    saveMissing: isDevelopment,
    debug: false,

    react: {
        useSuspense: false,
    },

    interpolation: {
        escapeValue: false,
    },

    backend: {
        backends: [
            LocalStorageBackend, // primary backend
            HttpBackend, // fallback backend
        ],
        backendOptions: [
            {
                /* options for primary backend */
            },
            {
                loadPath: "/locales/{{lng}}/{{ns}}.json",
            } satisfies HttpBackendOptions,
        ],
        // todo: play with this setting for better cache updates in production
        cacheHitMode: "refreshAndUpdateStore",
    },
};
