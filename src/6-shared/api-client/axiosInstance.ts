import axios from "axios";

import { BASE_URL } from "./constants";
import { accessTokenStorage } from "./logic/access-token/accessTokenStorage";
import { responseErrorHandler } from "./logic/responseErrorHandler";
import { helpers } from "@shared/utils";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
    config.headers.set("Accept", "application/json");

    const accessToken = accessTokenStorage.get();

    if (accessToken) {
        try {
            config.headers.set("Authorization", `Bearer ${accessToken}`);
        } catch (error) {
            console.error(error);
        }
    }

    return config;
});

axiosInstance.interceptors.response.use(helpers.identity, responseErrorHandler);
