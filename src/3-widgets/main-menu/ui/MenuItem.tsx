import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { MenuItemProps } from "../types";
import { useStaticNavigate } from "@shared/routes";
import { useLocation } from "react-router";

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
