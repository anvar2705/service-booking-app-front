import { localStorage } from "@shared/utils";

import { REFRESH_TOKEN_SESSION_KEY } from "../../constants";
import type { TokensData } from "../../types";

export const refreshTokenStorage = {
    get: (): TokensData["refresh_token"] | null => {
        return localStorage.get<string>(REFRESH_TOKEN_SESSION_KEY);
    },
    set: (token: TokensData["refresh_token"]) => {
        localStorage.set(REFRESH_TOKEN_SESSION_KEY, token);
    },
    remove: () => {
        localStorage.remove(REFRESH_TOKEN_SESSION_KEY);
    },
};
