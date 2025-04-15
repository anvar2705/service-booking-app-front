import { useState } from "react";

import { useStaticRouter } from "./useStaticRouter";

export function useStaticNavigate() {
    const router = useStaticRouter();
    const [navigate] = useState(() => router.navigate.bind(router));
    return navigate;
}
