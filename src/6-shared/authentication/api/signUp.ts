import { DefaultError, UseMutationOptions } from "@tanstack/react-query";

import { axiosInstance, queryClient } from "@shared/api-client";
import { TagTypesEnum } from "@shared/api-client";

import type { SignUpFormValues } from "../types";

export const signUpMutationOptions: UseMutationOptions<void, DefaultError, SignUpFormValues> = {
    mutationFn: async (data: SignUpFormValues) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password_confirmation, ...body } = data;
        return await axiosInstance.post("/auth/sign-up", body);
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
};
