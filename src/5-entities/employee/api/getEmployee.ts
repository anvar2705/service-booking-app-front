import { queryOptions } from "@tanstack/react-query";

import { axiosInstance, TagTypesEnum } from "@shared/api-client";

import { EmployeeModel } from "../types";

export const getEmployeeQueryOptions = (id: number) =>
    queryOptions({
        queryFn: async () => (await axiosInstance.get<EmployeeModel>(`/employees/${id}`)).data,
        queryKey: [TagTypesEnum.EMPLOYEE, id],
    });
