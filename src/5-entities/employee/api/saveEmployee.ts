import { axiosInstance, LIST_TAG_TYPE_ID, queryClient, TagTypesEnum, UseMutationOptions } from "@shared/api-client";

import { EditEmployeeFormValues, EmployeeFormValues, EmployeeModel } from "../types";

type SaveEmployeePayload = EmployeeFormValues & {
    company_uuid: string;
};

function isEditing(data: EmployeeFormValues): data is EditEmployeeFormValues {
    return Boolean((data as EditEmployeeFormValues)?.id);
}

export const SaveEmployeeMutationOptions: UseMutationOptions<EmployeeModel, SaveEmployeePayload> = {
    mutationFn: async (data) => {
        if (isEditing(data)) {
            const { id, ...body } = data;

            return axiosInstance.patch(`/employees/${id}`, body);
        }

        return axiosInstance.post("/employees", data);
    },
    onSuccess: (_, payload) => {
        void queryClient.invalidateQueries({
            predicate: (query) => {
                const [tagType, id] = query.queryKey;

                return (
                    ((tagType === TagTypesEnum.EMPLOYEE || tagType === TagTypesEnum.COMPANY_EMPLOYEE) &&
                        id === LIST_TAG_TYPE_ID) ||
                    (isEditing(payload) && tagType === TagTypesEnum.EMPLOYEE && id === payload.id)
                );
            },
        });
    },
};
