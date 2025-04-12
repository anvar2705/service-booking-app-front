import { lazy, Suspense } from "react";

import { Navigate, Route } from "react-router";

import { AuthenticationPageRoutes } from "@pages/authentication";
import {
    AuthenticationRoutePathEnum,
    RoutesWithPageNotFound,
    APP_ROOT_ROUT_PATH,
    useStaticLocation,
    CalendarRoutePathEnum,
} from "@shared/routes";

import { useIsAuthenticated } from "@shared/authentication";

const CalendarPageRoutes = lazy(async () => await import("@pages/calendar"));

export function Routes() {
    const { pathname } = useStaticLocation();
    const isAuthenticated = useIsAuthenticated();
    let indexNavigatePath: string = CalendarRoutePathEnum.CALENDAR;

    if (pathname === APP_ROOT_ROUT_PATH) {
        const mode = import.meta.env.MODE;
        const viteDevIndexRoute: string = import.meta.env.VITE_DEV_INDEX_ROUTE;

        if (mode === "development") {
            indexNavigatePath = viteDevIndexRoute;
        }
    }

    return (
        <Suspense fallback={<div>TODO</div>}>
            <RoutesWithPageNotFound>
                {isAuthenticated ? (
                    <Route index element={<Navigate to={indexNavigatePath} replace />} />
                ) : (
                    <Route index element={<Navigate to={AuthenticationRoutePathEnum.AUTH_SIGN_IN} replace />} />
                )}

                <Route path={AuthenticationRoutePathEnum.AUTH_ASTERISK} element={<AuthenticationPageRoutes />} />
                <Route path={CalendarRoutePathEnum.CALENDAR_ASTERISK} element={<CalendarPageRoutes />} />
            </RoutesWithPageNotFound>
        </Suspense>
    );
}
