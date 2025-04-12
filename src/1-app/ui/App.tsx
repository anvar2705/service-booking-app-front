import { ErrorBoundary } from "@shared/components/ErrorBoundary";

import { Providers } from "./Providers";
import { Routes } from "./Routes";

export function App() {
    return (
        <ErrorBoundary>
            <Providers>
                <ErrorBoundary>
                    <Routes />
                </ErrorBoundary>
            </Providers>
        </ErrorBoundary>
    );
}
