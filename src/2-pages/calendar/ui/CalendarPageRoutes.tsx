import { Route } from "react-router";

import { RoutesWithPageNotFound } from "@shared/routes";

export function CalendarPageRoutes() {
    return (
        <RoutesWithPageNotFound>
            <Route index element={<div>Calendar</div>} />
        </RoutesWithPageNotFound>
    );
}
