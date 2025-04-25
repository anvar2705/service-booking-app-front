import { PropsWithChildren } from "react";

import { useStore } from "../logic/store";

export const OnlyInitialized = ({ children }: PropsWithChildren) => {
    const isInitialized = useStore(({ isInitialized }) => isInitialized);

    return isInitialized ? children : null;
};
