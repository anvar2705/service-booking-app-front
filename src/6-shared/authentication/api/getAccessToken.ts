import { useQueryClient } from "@tanstack/react-query";

import { accessTokenStorage, buildQueryHook, TagTypesEnum } from "@shared/api-client";

const getAccessToken = () => {
    const [token] = accessTokenStorage.get();
    return token;
};

export const useGetAccessTokenQuery = buildQueryHook({
    queryFn: getAccessToken,
    queryKey: [TagTypesEnum.ACCESS_TOKEN],
});

export const useLazyGetAccessTokenQuery = () => {
    const queryClient = useQueryClient();

    return () =>
        queryClient.ensureQueryData({
            queryFn: getAccessToken,
            queryKey: [TagTypesEnum.ACCESS_TOKEN],
        });
};
