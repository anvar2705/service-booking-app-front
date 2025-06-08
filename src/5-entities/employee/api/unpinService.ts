import { axiosInstance, LIST_TAG_TYPE_ID, queryClient, TagTypesEnum, UseMutationOptions } from "@shared/api-client";

import { UnpinServicePayload } from "../types";

export const unpinServiceMutationOptions: UseMutationOptions<void, UnpinServicePayload> = {
    mutationFn: ({ employeeId, uuid }) => axiosInstance.post(`/employees/${employeeId}/services/${uuid}/unpin`),
    onSuccess: () => {
        void queryClient.invalidateQueries({
            predicate: (query) => {
                const [tagType, id] = query.queryKey;

                return tagType === TagTypesEnum.EMPLOYEE_SERVICES && id === LIST_TAG_TYPE_ID;
            },
        });
    },
};
