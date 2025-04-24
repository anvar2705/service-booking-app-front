import { useQueries } from "@tanstack/react-query";

import { getAccessTokenQueryOptions } from "../api/getAccessToken";
import { getRefreshTokenQueryOptions } from "../api/getRefreshToken";

export function useIsAuthenticated() {
    const [{ data: accessToken }, { data: refreshToken }] = useQueries({
        queries: [getAccessTokenQueryOptions(), getRefreshTokenQueryOptions()],
    });

    return Boolean(accessToken && refreshToken);
}
