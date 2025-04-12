import {
    type AccessTokenData,
    accessTokenStorage,
    axiosInstance,
    buildMutationHook,
    generateAccessTokenExpire,
    queryClient,
} from "@shared/api-client";
import { TagTypesEnum } from "@shared/api-client";

import type { LoginFormValues } from "../types";

export const useSignInMutation = buildMutationHook({
    mutationFn: async (credentials: LoginFormValues) => {
        const response = (await axiosInstance.post<AccessTokenData>("/auth/sign-in", credentials)).data;
        const { access_token: token } = response;
        const expire = generateAccessTokenExpire();
        accessTokenStorage.set(token, expire);
    },
    onSuccess: () => {
        void queryClient.invalidateQueries({
            predicate: (query) => {
                const [tagType] = query.queryKey;

                return tagType === TagTypesEnum.ACCESS_TOKEN;
            },
        });
    },
});
