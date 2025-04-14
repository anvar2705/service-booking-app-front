import { ErrorBoundary } from "@shared/components/ErrorBoundary";

import { Providers } from "./Providers";
import { Routes } from "./Routes";
import { AuthenticationChecker } from "@shared/authentication";
import { Layout } from "./layout/Layout";

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
