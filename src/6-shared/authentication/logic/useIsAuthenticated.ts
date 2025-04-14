import { useGetAccessTokenQuery } from "../api/getAccessToken";
import { useGetRefreshTokenQuery } from "../api/getRefreshToken";

export function useIsAuthenticated() {
    const { data: accessToken } = useGetAccessTokenQuery();
    const { data: refreshToken } = useGetRefreshTokenQuery();

    return Boolean(accessToken && refreshToken);
}
