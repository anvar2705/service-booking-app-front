import type { Location } from "react-router";

import { useStaticRouter } from "./useStaticRouter";

export function useStaticLocation<T>() {
    const router = useStaticRouter();
    return router.state.location as Location<T>;
}
