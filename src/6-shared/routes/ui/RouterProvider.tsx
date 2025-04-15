import type { PropsWithChildren } from "react";
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from "react-router";

import { routerContext } from "../logic/context";

export function RouterProvider({ children }: PropsWithChildren) {
    // see https://github.com/remix-run/react-router/issues/7634
    // https://github.com/remix-run/react-router/issues/7634#issuecomment-1306650156
    // https://github.com/remix-run/react-router/issues/7634#issuecomment-1017572625
    const router = createBrowserRouter([{ path: "*", element: children }]);

    return (
        <routerContext.Provider value={router}>
            <ReactRouterProvider router={router} />
        </routerContext.Provider>
    );
}
