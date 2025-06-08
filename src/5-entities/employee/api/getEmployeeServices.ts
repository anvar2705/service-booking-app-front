import { ServiceModel } from "@entities/service";
import { AppTagType, axiosInstance, TagTypesEnum } from "@shared/api-client";
import { buildTableTanstackQueryHook } from "@shared/components/Table/logic/buildTableTanstackQueryHook";

import { EmployeeModel } from "../types";

export const useGetEmployeeServicesTableQuery = buildTableTanstackQueryHook<
    AppTagType,
    ServiceModel,
    ServiceModel,
    EmployeeModel["id"]
>(axiosInstance, (id) => `/employees/${id}/services`, TagTypesEnum.EMPLOYEE_SERVICES);
