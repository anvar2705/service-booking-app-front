import { Box, Divider, Drawer, IconButton } from "@mui/material";
import { setMainMenuCollapsed, useMainMenuCollapsed } from "../logic/store";
import { MenuItem as MenuItemComponent } from "./MenuItem";
import { MenuItem } from "../types";
import { CalendarRoutePathEnum, SettingsRoutePathEnum } from "@shared/routes";
import { useTranslation } from "react-i18next";
import { NamespaceEnum } from "@shared/i18n";
import { DRAWER_WIDTH } from "../constants";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const MainMenu = () => {
    const collapsed = useMainMenuCollapsed();

    const { t } = useTranslation(NamespaceEnum.SHARED, { keyPrefix: "mainMenu" });

    const handleClose = () => {
        setMainMenuCollapsed(true);
    };

    const MENU_ITEMS: MenuItem[] = [
        {
            href: CalendarRoutePathEnum.CALENDAR,
            title: t("calendar"),
        },
        {
            href: SettingsRoutePathEnum.SETTINGS,
            title: t("settings"),
        },
    ];

    return (
        <Drawer
            open={!collapsed}
            onClose={handleClose}
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: DRAWER_WIDTH,
                    boxSizing: "border-box",
                },
            }}
            variant="persistent"
            anchor="left"
        >
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                <IconButton onClick={handleClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </Box>
            <Divider />

            {MENU_ITEMS.map((item) => (
                <MenuItemComponent key={item.href} item={item} />
            ))}
        </Drawer>
    );
};
