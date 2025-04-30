import { EmployeeModel } from "@entities/employee";
import { AppTagType, axiosInstance, TagTypesEnum } from "@shared/api-client";
import { buildTableTanstackQueryHook } from "@shared/components/Table/logic/buildTableTanstackQueryHook";

export const useGetCompanyEmployeesTableQuery = buildTableTanstackQueryHook<
    AppTagType,
    EmployeeModel,
    EmployeeModel,
    string
>(axiosInstance, (companyUUID) => `/companies/${companyUUID}/employees`, TagTypesEnum.EMPLOYEE);
