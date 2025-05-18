import { createRootRoute, Outlet } from "@tanstack/react-router";

import { AuthenticationChecker } from "@shared/authentication";
import { ErrorBoundary } from "@shared/components/ErrorBoundary";
import { PageNotFound } from "@shared/components/PageNotFound";
import { Initializer, OnlyInitialized, OnlyNotInitialized } from "@widgets/initializer";
import { MainLoading } from "@widgets/main-loading";

import { Layout } from "../ui/layout/Layout";
import { Providers } from "../ui/Providers";

export const Route = createRootRoute({
    component: () => (
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
                                <Outlet />
                            </ErrorBoundary>
                        </Layout>
                    </OnlyInitialized>
                </MainLoading>
            </Providers>
        </ErrorBoundary>
    ),
    notFoundComponent: () => <PageNotFound />,
    // errorComponent: () => <div>sad</div>, // TODO
});
