import { Navigate, Route } from "react-router";

import { AuthenticationRoutePathEnum, RoutesWithPageNotFound } from "@shared/routes";

import { SignInPage } from "./SignInPage";
import { SignUpPage } from "./SignUpPage";

export function AuthenticationPageRoutes() {
    return (
        <RoutesWithPageNotFound>
            <Route index element={<Navigate to={AuthenticationRoutePathEnum.AUTH_SIGN_IN} replace />} />
            <Route path={AuthenticationRoutePathEnum.SIGN_IN} element={<SignInPage />} />
            <Route path={AuthenticationRoutePathEnum.SIGN_UP} element={<SignUpPage />} />
        </RoutesWithPageNotFound>
    );
}
