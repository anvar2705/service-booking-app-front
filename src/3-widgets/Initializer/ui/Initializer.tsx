import { useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";

import { getAccountQueryOptions } from "@entities/account";
import { getRefreshTokenQueryOptions } from "@shared/authentication";
import { getAccessTokenQueryOptions } from "@shared/authentication/api/getAccessToken";
import { AuthenticationRoutePathEnum } from "@shared/routes";
import { useMainLoading } from "@widgets/main-loading";

import { setInitiaized } from "../logic/store";

export const Initializer = () => {
    const pathname = useLocation({ select: ({ pathname }) => pathname });
    const isSignInPage = pathname === AuthenticationRoutePathEnum.AUTH_SIGN_IN;
    const isSignUpPage = pathname === AuthenticationRoutePathEnum.AUTH_SIGN_UP;

    const [
        { isSuccess: isSuccessGetAccount, isLoading: isLoadingGetAccount },
        { isSuccess: isSuccessGetAccessToken, isLoading: isLoadingGetAccessToken },
        { isSuccess: isSuccessGetRefreshToken, isLoading: isLoadingGetRefreshToken },
    ] = useQueries({
        queries: [
            { ...getAccountQueryOptions(), enabled: !isSignInPage && !isSignUpPage },
            getAccessTokenQueryOptions(),
            getRefreshTokenQueryOptions(),
        ],
    });

    useMainLoading(Boolean(isLoadingGetAccount || isLoadingGetAccessToken || isLoadingGetRefreshToken));

    useEffect(() => {
        if (isSignInPage || isSignUpPage) {
            setInitiaized();
            return;
        }

        if (isSuccessGetAccount && isSuccessGetAccessToken && isSuccessGetRefreshToken) {
            setInitiaized();
        }
    }, [isSignInPage, isSignUpPage, isSuccessGetAccount, isSuccessGetAccessToken, isSuccessGetRefreshToken]);

    return null;
};
