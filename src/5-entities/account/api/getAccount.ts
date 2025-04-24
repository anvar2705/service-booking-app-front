import { queryOptions } from "@tanstack/react-query";

import { axiosInstance, TagTypesEnum } from "@shared/api-client";

import { AccountModel } from "../types";

export const getAccountQueryOptions = () =>
    queryOptions({
        queryFn: async () => (await axiosInstance.get<AccountModel>("/auth/account")).data,
        queryKey: [TagTypesEnum.ACCOUNT],
    });
