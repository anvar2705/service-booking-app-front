import { useQuery } from "@tanstack/react-query";

import { getAccountQueryOptions } from "../api/getAccount";

export const useAccount = () => {
    const { data } = useQuery(getAccountQueryOptions());

    return data;
};
