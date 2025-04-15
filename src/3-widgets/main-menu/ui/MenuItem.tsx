import { useLocation } from "react-router";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";

import { useStaticNavigate } from "@shared/routes";

import { MenuItemProps } from "../types";

export const MenuItem = (props: MenuItemProps) => {
    const { item } = props;

    const navigate = useStaticNavigate();
    const { pathname } = useLocation();
    const selected = pathname === item.href;

    const handleClick = () => {
        navigate(item.href);
    };

    return (
        <ListItem disablePadding sx={{ backgroundColor: (theme) => (selected ? theme.palette.divider : undefined) }}>
            <ListItemButton onClick={handleClick} disableRipple>
                <ListItemText primary={item.title} />
            </ListItemButton>
        </ListItem>
    );
};
