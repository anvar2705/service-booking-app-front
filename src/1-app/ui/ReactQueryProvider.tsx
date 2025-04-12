import { type PropsWithChildren } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@shared/api-client";

export function ReactQueryProvider({ children }: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
