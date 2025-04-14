import { Route } from "react-router";

import { RoutesWithPageNotFound } from "@shared/routes";

export function SettingsPageRoutes() {
    return (
        <RoutesWithPageNotFound>
            <Route index element={<div>Settings</div>} />
        </RoutesWithPageNotFound>
    );
}
