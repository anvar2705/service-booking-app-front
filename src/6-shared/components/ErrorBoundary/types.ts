import type { ComponentType } from "react";
import type { ErrorBoundaryPropsWithComponent, FallbackProps } from "react-error-boundary";

import { MakePartial } from "@shared/utils";

export type ErrorFallbackTranslations = {
    resetText: string;
    showDetails: string;
    dynamicallyImportedModuleError: {
        title: string;
        details: string;
        resetText: string;
    };
};

export type ErrorFallbackProps = Omit<FallbackProps, "error"> & {
    translations: ErrorFallbackTranslations;
    error: { title: string; message?: string; stack?: string };
};

export type ErrorBoundaryProps = Omit<MakePartial<ErrorBoundaryPropsWithComponent, "onReset">, "FallbackComponent"> & {
    FallbackComponent: ComponentType<ErrorFallbackProps>;
    translations: ErrorFallbackTranslations;
};
