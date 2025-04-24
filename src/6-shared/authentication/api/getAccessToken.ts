import { queryOptions, useQueryClient } from "@tanstack/react-query";

import { accessTokenStorage, TagTypesEnum } from "@shared/api-client";

const getAccessToken = () => {
    return accessTokenStorage.get();
};

export const getAccessTokenQueryOptions = () =>
    queryOptions({
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
