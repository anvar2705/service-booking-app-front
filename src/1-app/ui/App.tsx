import { ErrorBoundary } from "@shared/components/ErrorBoundary";

import { Providers } from "./Providers";
import { Routes } from "./Routes";
import { AuthenticationChecker } from "@shared/authentication";

export function App() {
    return (
        <ErrorBoundary>
            <Providers>
                <AuthenticationChecker />

                <ErrorBoundary>
                    <Routes />
                </ErrorBoundary>
            </Providers>
        </ErrorBoundary>
    );
}
