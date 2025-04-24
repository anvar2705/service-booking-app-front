import { UseMutationOptions } from "@tanstack/react-query";

import { accessTokenStorage, queryClient, refreshTokenStorage, TagTypesEnum } from "@shared/api-client";

export const signOutMutationOptions: UseMutationOptions = {
    mutationFn: () =>
        new Promise((resolve) => {
            resolve(undefined);
        }),
    onMutate: () => {
        accessTokenStorage.remove();
        refreshTokenStorage.remove();
    },
    onSuccess: () => {
        void queryClient.invalidateQueries({
            predicate: (query) => {
                const [tagType] = query.queryKey;

                return tagType === TagTypesEnum.ACCESS_TOKEN || tagType === TagTypesEnum.REFRESH_TOKEN;
            },
        });
    },
};
