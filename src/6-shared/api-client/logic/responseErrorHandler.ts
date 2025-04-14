import { enqueueSnackbar } from "notistack";

import { STRONG_ERROR_MESSAGE_DURATION } from "../constants";
import axios from "axios";
import { refreshTokenStorage } from "./refresh-token/refreshTokenStorage";
import { TokensData } from "../types";
import { accessTokenStorage } from "./access-token/accessTokenStorage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const responseErrorHandler = async (error: any) => {
    if (error.status === 401) {
        try {
            const refreshToken = refreshTokenStorage.get();
            if (refreshToken) {
                const response = (
                    await axios.post<TokensData>("/api/auth/refresh-tokens", { refresh_token: refreshToken })
                ).data;
                console.log("response", response);
                accessTokenStorage.set(response.access_token);
                refreshTokenStorage.set(response.refresh_token);
                return;
            } else {
                window.location.href = "/auth/sign-in";
            }
        } catch {
            console.log("refresh token error");
        }
    }

    try {
        let message: string;
        let status: number | string = error.status;

        message = "error" in error.response.data ? error.response.data.error : error.response.data.message;

        try {
            const errorJSON = JSON.parse(message.replace(/^[^{]*/, ""));
            message = errorJSON?.error?.reason ?? message;
            status = (errorJSON?.status as number) ?? status;
        } catch (error) {
            console.error(error);
        }

        enqueueSnackbar(message, {
            variant: status === 500 ? "error" : "warning",
            autoHideDuration: status === 500 ? STRONG_ERROR_MESSAGE_DURATION : undefined,
        });
    } catch (error) {
        console.info(error);
        throw error;
    }
};
