import {
    type TokensData,
    accessTokenStorage,
    axiosInstance,
    buildMutationHook,
    queryClient,
    refreshTokenStorage,
} from "@shared/api-client";
import { TagTypesEnum } from "@shared/api-client";

import type { LoginFormValues } from "../types";

export const useSignInMutation = buildMutationHook({
    mutationFn: async (credentials: LoginFormValues) => {
        const response = (await axiosInstance.post<TokensData>("/auth/sign-in", credentials)).data;
        const { access_token, refresh_token } = response;
        accessTokenStorage.set(access_token);
        refreshTokenStorage.set(refresh_token);
    },
    onSuccess: () => {
        void queryClient.invalidateQueries({
            predicate: (query) => {
                const [tagType] = query.queryKey;

                return (
                    tagType === TagTypesEnum.ACCESS_TOKEN ||
                    tagType === TagTypesEnum.REFRESH_TOKEN ||
                    tagType === TagTypesEnum.ACCOUNT
                );
            },
        });
    },
});
