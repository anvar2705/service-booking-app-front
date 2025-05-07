import { AuthenticationChecker } from "@shared/authentication";
import { ErrorBoundary } from "@shared/components/ErrorBoundary";
import { Initializer, OnlyNotInitialized } from "@widgets/initializer";
import { OnlyInitialized } from "@widgets/initializer/ui/OnlyInitialized";
import { MainLoading } from "@widgets/main-loading";

import { Layout } from "./layout/Layout";
import { Providers } from "./Providers";
import { Routes } from "./Routes";

export function App() {
    return (
        <ErrorBoundary>
            <Providers>
                <OnlyNotInitialized>
                    <Initializer />
                </OnlyNotInitialized>

                <MainLoading>
                    <OnlyInitialized>
                        <AuthenticationChecker />
                        <Layout>
                            <ErrorBoundary>
                                <Routes />
                            </ErrorBoundary>
                        </Layout>
                    </OnlyInitialized>
                </MainLoading>
            </Providers>
        </ErrorBoundary>
    );
}
