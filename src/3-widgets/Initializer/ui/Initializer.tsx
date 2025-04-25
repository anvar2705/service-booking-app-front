import { useEffect } from "react";
import { useMatch } from "react-router";
import { useQueries } from "@tanstack/react-query";

import { getAccountQueryOptions } from "@entities/account";
import { getRefreshTokenQueryOptions } from "@shared/authentication";
import { getAccessTokenQueryOptions } from "@shared/authentication/api/getAccessToken";
import { AuthenticationRoutePathEnum } from "@shared/routes";
import { useMainLoading } from "@widgets/MainLoading";

import { setInitiaized } from "../logic/store";

export const Initializer = () => {
    const isSignInPage = Boolean(useMatch(AuthenticationRoutePathEnum.AUTH_SIGN_IN));
    const isSignUpPage = Boolean(useMatch(AuthenticationRoutePathEnum.AUTH_SIGN_UP));

    const [
        { isSuccess: isSuccessGetAccount, isLoading: isLoadingGetAccount },
        { isSuccess: isSuccessGetAccessToken, isLoading: isLoadingGetAccessToken },
        { isSuccess: isSuccessGetRefreshToken, isLoading: isLoadingGetRefreshToken },
    ] = useQueries({
        queries: [getAccountQueryOptions(), getAccessTokenQueryOptions(), getRefreshTokenQueryOptions()],
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
