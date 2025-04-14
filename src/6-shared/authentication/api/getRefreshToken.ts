import { buildQueryHook, refreshTokenStorage, TagTypesEnum } from "@shared/api-client";

export const useGetRefreshTokenQuery = buildQueryHook({
    queryFn: () => refreshTokenStorage.get(),
    queryKey: [TagTypesEnum.REFRESH_TOKEN],
});
