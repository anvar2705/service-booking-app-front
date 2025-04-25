import { PropsWithChildren } from "react";

import { useStore } from "../logic/store";

export const OnlyNotInitialized = ({ children }: PropsWithChildren) => {
    const isInitialized = useStore(({ isInitialized }) => isInitialized);

    return isInitialized ? null : children;
};
