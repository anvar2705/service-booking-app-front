import { useTranslation } from "react-i18next";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Divider, Drawer, IconButton } from "@mui/material";

import { NamespaceEnum } from "@shared/i18n";

import { DRAWER_WIDTH } from "../constants";
import { setMainMenuCollapsed, useMainMenuCollapsed } from "../logic/store";
import { MenuItem } from "../types";

import { MenuItem as MenuItemComponent } from "./MenuItem";

export const MainMenu = () => {
    const collapsed = useMainMenuCollapsed();

    const { t } = useTranslation(NamespaceEnum.SHARED, { keyPrefix: "mainMenu" });

    const handleClose = () => {
        setMainMenuCollapsed(true);
    };

    const MENU_ITEMS: MenuItem[] = [
        {
            href: "/",
            title: t("calendar"),
        },
        {
            href: "/settings",
            title: t("settings"),
        },
        {
            href: "/employees",
            title: t("employees"),
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
