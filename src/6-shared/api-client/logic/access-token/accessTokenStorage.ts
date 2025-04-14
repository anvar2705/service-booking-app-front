import { localStorage } from "@shared/utils";

import { ACCESS_TOKEN_SESSION_KEY } from "../../constants";
import type { TokensData } from "../../types";

export const accessTokenStorage = {
    get: (): TokensData["access_token"] | null => {
        return localStorage.get<string>(ACCESS_TOKEN_SESSION_KEY);
    },
    set: (token: TokensData["access_token"]) => {
        localStorage.set(ACCESS_TOKEN_SESSION_KEY, token);
    },
    remove: () => {
        localStorage.remove(ACCESS_TOKEN_SESSION_KEY);
    },
};
