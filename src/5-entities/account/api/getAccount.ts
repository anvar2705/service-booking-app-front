import { EmployeeModel } from "@entities/employee";
import { axiosInstance, buildQueryHook, TagTypesEnum } from "@shared/api-client";

export const useGetAccountQuery = buildQueryHook({
    queryFn: async () => (await axiosInstance.get<EmployeeModel>("/auth/account")).data,
    queryKey: [TagTypesEnum.ACCOUNT],
});
