import {
    accessTokenStorage,
    buildMutationHook,
    queryClient,
    refreshTokenStorage,
    TagTypesEnum,
} from "@shared/api-client";

export const useSignOutMutation = buildMutationHook({
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

                return (
                    tagType === TagTypesEnum.ACCESS_TOKEN ||
                    tagType === TagTypesEnum.REFRESH_TOKEN ||
                    tagType === TagTypesEnum.ACCOUNT
                );
            },
        });
    },
});
