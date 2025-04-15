import type { PropsWithChildren } from "react";
import { Route, Routes } from "react-router";

import { PageNotFound } from "./PageNotFound";

export function RoutesWithPageNotFound({ children }: PropsWithChildren) {
  return (
    <Routes>
      {children}
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}
