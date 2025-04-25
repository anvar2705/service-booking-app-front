import { queryOptions, skipToken } from "@tanstack/react-query";

import { EmployeeModel } from "@entities/employee";
import { axiosInstance, LIST_TAG_TYPE_ID, TagTypesEnum } from "@shared/api-client";
import { TableData } from "@shared/components/Table";

export const getCompanyEmployeesQueryOptions = (uuid?: string) =>
    queryOptions({
        queryFn: uuid
            ? async () => (await axiosInstance.get<TableData<EmployeeModel>>(`/companies/${uuid}/employees`)).data
            : skipToken,
        queryKey: [TagTypesEnum.COMPANY_EMPLOYEE, LIST_TAG_TYPE_ID],
    });
