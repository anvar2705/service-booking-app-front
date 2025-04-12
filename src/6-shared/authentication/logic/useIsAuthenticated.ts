import { useGetAccessTokenQuery } from "../api/getAccessToken";

export function useIsAuthenticated() {
    return Boolean(useGetAccessTokenQuery().data);
}
