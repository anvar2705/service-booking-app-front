import { useQuery } from "@tanstack/react-query";

import { getAccountQueryOptions } from "../api/getAccount";

export const useAccountCompany = () => {
    const { data } = useQuery(getAccountQueryOptions());

    return data?.company;
};
