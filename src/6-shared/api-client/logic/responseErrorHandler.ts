import axios, { isAxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

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
export const responseErrorHandler = async (error: any) => {
    if (error.status === 401) {
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
            }
        } catch (error: unknown) {
            if (isAxiosError(error) && error.status === 401) {
                removeTokens();
            }
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
