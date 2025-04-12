import { useContext } from "react";
import { routerContext } from "./context";

export function useStaticRouter() {
    const router = useContext(routerContext);

    if (!router) {
        throw new ReferenceError("router is undefined");
    }

    return router;
}
