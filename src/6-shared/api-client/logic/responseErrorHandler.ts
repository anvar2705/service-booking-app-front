import axios, { HttpStatusCode, isAxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

import { AuthenticationRoutePathEnum } from "@shared/routes";

import { STRONG_ERROR_MESSAGE_DURATION, TagTypesEnum } from "../constants";
import { queryClient } from "../queryClient";
import { TokensData } from "../types";

import { accessTokenStorage } from "./access-token/accessTokenStorage";
import { refreshTokenStorage } from "./refresh-token/refreshTokenStorage";

const removeTokens = () => {
    accessTokenStorage.remove();
    refreshTokenStorage.remove();
    queryClient.invalidateQueries({
        predicate: (query) => {
            const [tagType] = query.queryKey;

            return tagType === TagTypesEnum.ACCESS_TOKEN || tagType === TagTypesEnum.REFRESH_TOKEN;
        },
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const responseErrorHandler = async (axiosError: any) => {
    if (axiosError.status === HttpStatusCode.Unauthorized) {
        try {
            const refreshToken = refreshTokenStorage.get();
            if (refreshToken) {
                const response = (
                    await axios.post<TokensData>("/api/auth/refresh-tokens", { refresh_token: refreshToken })
                ).data;
                accessTokenStorage.set(response.access_token);
                refreshTokenStorage.set(response.refresh_token);
                return;
            } else {
                removeTokens();
                window.location.href = AuthenticationRoutePathEnum.AUTH_SIGN_IN;
            }
        } catch (error: unknown) {
            if (isAxiosError(error) && error.status === HttpStatusCode.Unauthorized) {
                removeTokens();
                window.location.href = AuthenticationRoutePathEnum.AUTH_SIGN_IN;
            }
        }
    }

    let responseError: Error | null = null;

    const status: number | string = axiosError.status;
    const message =
        "error" in axiosError.response.data ? axiosError.response.data.error : axiosError.response.data.message;

    enqueueSnackbar(message, {
        variant: status === HttpStatusCode.InternalServerError ? "error" : "warning",
        autoHideDuration: status === HttpStatusCode.InternalServerError ? STRONG_ERROR_MESSAGE_DURATION : undefined,
    });

    if (typeof status === "number") {
        if (status < Number(HttpStatusCode.Ok) || status >= Number(HttpStatusCode.BadRequest)) {
            responseError = new Error(message);
        }
    }

    if (responseError) {
        throw responseError;
    }

    return axiosError;
};
