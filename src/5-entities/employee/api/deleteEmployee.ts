import { axiosInstance, LIST_TAG_TYPE_ID, queryClient, TagTypesEnum, UseMutationOptions } from "@shared/api-client";

import { EmployeeModel } from "../types";

export const deleteEmployeeMutationOptions: UseMutationOptions<void, EmployeeModel["id"]> = {
    mutationFn: (id) => axiosInstance.delete(`/employees/${id}`),
    onSuccess: () => {
        void queryClient.invalidateQueries({
            predicate: (query) => {
                const [tagType, id] = query.queryKey;

                return (
                    (tagType === TagTypesEnum.EMPLOYEE || tagType === TagTypesEnum.COMPANY_EMPLOYEE) &&
                    id === LIST_TAG_TYPE_ID
                );
            },
        });
    },
};
