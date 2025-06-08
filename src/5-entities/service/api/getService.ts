import { queryOptions, skipToken } from "@tanstack/react-query";

import { axiosInstance, TagTypesEnum } from "@shared/api-client";

import { ServiceModel } from "../types";

export const getServiceQueryOptions = (uuid: ServiceModel["uuid"] | null) =>
    queryOptions({
        queryFn: uuid ? async () => (await axiosInstance.get<ServiceModel>(`/services/${uuid}`)).data : skipToken,
        queryKey: [TagTypesEnum.SERVICE, uuid],
    });
