import { Navigate, Route } from "react-router";

import { AuthenticationRoutePathEnum, RoutesWithPageNotFound } from "@shared/routes";

import { LoginPage } from "./LoginPage";

export function AuthenticationPageRoutes() {
    return (
        <RoutesWithPageNotFound>
            <Route index element={<Navigate to={AuthenticationRoutePathEnum.AUTH_LOGIN} replace />} />
            <Route path={AuthenticationRoutePathEnum.LOGIN} element={<LoginPage />} />
        </RoutesWithPageNotFound>
    );
}
