import { createContext } from "react";
import type { RouterProviderProps } from "react-router";

export const routerContext = createContext<RouterProviderProps["router"] | null>(null);
