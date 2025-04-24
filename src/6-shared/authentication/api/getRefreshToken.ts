import { queryOptions } from "@tanstack/react-query";

import { refreshTokenStorage, TagTypesEnum } from "@shared/api-client";

export const getRefreshTokenQueryOptions = () =>
    queryOptions({
        queryFn: () => refreshTokenStorage.get(),
        queryKey: [TagTypesEnum.REFRESH_TOKEN],
    });
