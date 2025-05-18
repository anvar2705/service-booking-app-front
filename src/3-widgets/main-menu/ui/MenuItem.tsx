import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation } from "@tanstack/react-router";

import { MenuItemProps } from "../types";

export const MenuItem = (props: MenuItemProps) => {
    const { item } = props;

    const pathname = useLocation({ select: ({ pathname }) => pathname });
    const selected = pathname === item.href;

    return (
        <Link to={item.href}>
            <ListItem
                disablePadding
                sx={{ backgroundColor: (theme) => (selected ? theme.palette.divider : undefined) }}
            >
                <ListItemButton disableRipple>
                    <ListItemText primary={item.title} />
                </ListItemButton>
            </ListItem>
        </Link>
    );
};
