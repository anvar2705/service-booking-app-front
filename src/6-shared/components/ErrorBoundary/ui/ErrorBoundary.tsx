import type { ComponentType, PropsWithChildren } from "react";
import { ErrorBoundary as ReactErrorBoundary,type FallbackProps } from "react-error-boundary";

import { useErrorFallbackTranslations } from "../logic/useErrorFallbackTranslations";
import type { ErrorBoundaryProps,ErrorFallbackProps, ErrorFallbackTranslations } from "../types";

import { ErrorFallback } from "./ErrorFallback";

function withTranslation(WrappedComponent: ComponentType<ErrorFallbackProps>, translations: ErrorFallbackTranslations) {
    return function WithTranslation(props: FallbackProps) {
        return <WrappedComponent {...props} translations={translations} />;
    };
}

export function ErrorBoundaryComponent(props: ErrorBoundaryProps) {
    const { FallbackComponent, children, translations, ...rest } = props;

    return (
        <ReactErrorBoundary FallbackComponent={withTranslation(FallbackComponent, translations)} {...rest}>
            {children}
        </ReactErrorBoundary>
    );
}

export function ErrorBoundary({ children }: PropsWithChildren) {
    const translations = useErrorFallbackTranslations();
    return (
        <ErrorBoundaryComponent translations={translations} FallbackComponent={ErrorFallback}>
            {children}
        </ErrorBoundaryComponent>
    );
}
