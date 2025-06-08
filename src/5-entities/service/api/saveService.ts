import { axiosInstance, LIST_TAG_TYPE_ID, queryClient, TagTypesEnum, UseMutationOptions } from "@shared/api-client";

import { ServiceFormValues, ServiceModel } from "../types";
import { isEditServiceFormValues } from "../utils";

export const SaveServiceMutationOptions: UseMutationOptions<ServiceModel, ServiceFormValues> = {
    mutationFn: async (data) => {
        if (isEditServiceFormValues(data)) {
            const { uuid, ...body } = data;

            return (await axiosInstance.patch<ServiceModel>(`/services/${uuid}`, body)).data;
        }

        return (await axiosInstance.post<ServiceModel>("/services", data)).data;
    },
    onSuccess: (_, payload) => {
        void queryClient.invalidateQueries({
            predicate: (query) => {
                const [tagType, id] = query.queryKey;

                return (
                    ((tagType === TagTypesEnum.SERVICE || tagType === TagTypesEnum.EMPLOYEE_SERVICES) &&
                        id === LIST_TAG_TYPE_ID) ||
                    (isEditServiceFormValues(payload) && tagType === TagTypesEnum.SERVICE && id === payload.uuid)
                );
            },
        });
    },
};
