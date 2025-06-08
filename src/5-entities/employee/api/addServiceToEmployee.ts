import { axiosInstance, LIST_TAG_TYPE_ID, queryClient, TagTypesEnum, UseMutationOptions } from "@shared/api-client";

import { AddServicesToEmployeePayload } from "../types";

export const addServiceEmployeeMutationOptions: UseMutationOptions<void, AddServicesToEmployeePayload> = {
    mutationFn: ({ employeeId, uuids }) =>
        axiosInstance.post(`/employees/${employeeId}/services`, { service_uuids: uuids }),
    onSuccess: () => {
        void queryClient.invalidateQueries({
            predicate: (query) => {
                const [tagType, id] = query.queryKey;

                return tagType === TagTypesEnum.EMPLOYEE_SERVICES && id === LIST_TAG_TYPE_ID;
            },
        });
    },
};
