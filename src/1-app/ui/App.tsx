import { AuthenticationChecker } from "@shared/authentication";
import { ErrorBoundary } from "@shared/components/ErrorBoundary";

import { Layout } from "./layout/Layout";
import { Providers } from "./Providers";
import { Routes } from "./Routes";

export function App() {
    return (
        <ErrorBoundary>
            <Providers>
                <AuthenticationChecker />

                <Layout>
                    <ErrorBoundary>
                        <Routes />
                    </ErrorBoundary>
                </Layout>
            </Providers>
        </ErrorBoundary>
    );
}
