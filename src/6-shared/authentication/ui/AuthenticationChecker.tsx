import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

import { APP_ROOT_ROUT_PATH, AuthenticationRoutePathEnum } from "@shared/routes";

import { useIsAuthenticated } from "../logic/useIsAuthenticated";

export function AuthenticationChecker() {
    const pathname = useLocation({ select: ({ pathname }) => pathname });
    const navigate = useNavigate();
    const isSignInPage = pathname === AuthenticationRoutePathEnum.AUTH_SIGN_IN;
    const isSignUpPage = pathname === AuthenticationRoutePathEnum.AUTH_SIGN_UP;

    const isAuthenticated = useIsAuthenticated();
    const restorePathNameRef = useRef(APP_ROOT_ROUT_PATH);

    const isShouldGoToSignInPage = !isAuthenticated && !isSignInPage && !isSignUpPage;
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

        void navigate({ to: path, replace });
    }, [navigate, path, replace]);

    return null;
}
