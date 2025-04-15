import { useEffect, useRef } from "react";
import { useMatch } from "react-router";

import { APP_ROOT_ROUT_PATH, AuthenticationRoutePathEnum, useStaticLocation, useStaticNavigate } from "@shared/routes";

import { useIsAuthenticated } from "../logic/useIsAuthenticated";

export function AuthenticationChecker() {
    const { pathname } = useStaticLocation();
    const navigate = useStaticNavigate();
    const signInPagePathMatch = useMatch(AuthenticationRoutePathEnum.AUTH_SIGN_IN);
    const isAuthenticated = useIsAuthenticated();
    const restorePathNameRef = useRef(APP_ROOT_ROUT_PATH);

    const isSignInPage = Boolean(signInPagePathMatch);
    const isShouldGoToSignInPage = !isAuthenticated && !isSignInPage;
    const isShouldReturnToPreviousPageOrToRoot = isAuthenticated && isSignInPage;

    let path: string | null = null;
    let replace = false;

    if (isShouldGoToSignInPage) {
        replace = false;
        path = AuthenticationRoutePathEnum.AUTH_SIGN_IN;
        restorePathNameRef.current = pathname;
    }

    if (isShouldReturnToPreviousPageOrToRoot) {
        replace = true;
        path = restorePathNameRef.current ?? APP_ROOT_ROUT_PATH;
        restorePathNameRef.current = APP_ROOT_ROUT_PATH;
    }

    useEffect(() => {
        if (!path) {
            return;
        }

        void navigate(path, { replace });
    }, [navigate, path, replace]);

    return null;
}
