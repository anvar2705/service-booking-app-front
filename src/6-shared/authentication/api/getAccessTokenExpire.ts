import { accessTokenStorage, buildQueryHook, TagTypesEnum } from "@shared/api-client";

export const useGetAccessTokenExpireQuery = buildQueryHook({
    queryFn: () => {
        const [, expire] = accessTokenStorage.get();
        return expire;
    },
    queryKey: [TagTypesEnum.ACCESS_TOKEN],
});
