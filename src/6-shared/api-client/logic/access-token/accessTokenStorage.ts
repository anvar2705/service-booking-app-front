import { type ISODateTime, localStorage } from "@shared/utils";

import { ACCESS_TOKEN_SESSION_KEY, ACCESS_TOKEN_STORAGE_SEPARATOR } from "../../constants";
import type { AccessTokenData } from "../../types";

export const accessTokenStorage = {
    get: (): [AccessTokenData["access_token"] | null, ISODateTime | null] => {
        const [token = null, expire = null] =
            localStorage.get<string>(ACCESS_TOKEN_SESSION_KEY)?.split(ACCESS_TOKEN_STORAGE_SEPARATOR) ?? [];
        return [token, expire];
    },
    set: (token: AccessTokenData["access_token"], expire: ISODateTime) => {
        localStorage.set(ACCESS_TOKEN_SESSION_KEY, [token, expire].join(ACCESS_TOKEN_STORAGE_SEPARATOR));
    },
    remove: () => {
        localStorage.remove(ACCESS_TOKEN_SESSION_KEY);
    },
};
