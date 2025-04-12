import { accessTokenStorage, buildMutationHook, queryClient, TagTypesEnum } from "@shared/api-client";

export const useLogoutMutation = buildMutationHook({
    mutationFn: () =>
        new Promise((resolve) => {
            resolve(undefined);
        }),
    onMutate: () => {
        accessTokenStorage.remove();
    },
    onSuccess: () => {
        void queryClient.invalidateQueries({
            queryKey: [TagTypesEnum.ACCESS_TOKEN],
        });
    },
});
