import { queryOptions } from "@tanstack/react-query";

import { axiosInstance, LIST_TAG_TYPE_ID, TagTypesEnum } from "@shared/api-client";

import { EmployeeModel } from "../types";

export const getEmployeeQueryOptions = (id: number) =>
    queryOptions({
        queryFn: async () => await axiosInstance.get<EmployeeModel>(`/employee/${id}`),
        queryKey: [TagTypesEnum.EMPLOYEE, LIST_TAG_TYPE_ID],
    });
