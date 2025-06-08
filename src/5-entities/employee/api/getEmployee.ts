import { queryOptions, skipToken } from "@tanstack/react-query";

import { axiosInstance, TagTypesEnum } from "@shared/api-client";

import { EmployeeModel } from "../types";

export const getEmployeeQueryOptions = (id: EmployeeModel["id"] | null) =>
    queryOptions({
        queryFn: id ? async () => (await axiosInstance.get<EmployeeModel>(`/employees/${id}`)).data : skipToken,
        queryKey: [TagTypesEnum.EMPLOYEE, id],
    });
