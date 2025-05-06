import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, SxProps } from "@mui/material";
import { Header as HeaderType, RowData } from "@tanstack/react-table";

import { IconButton } from "@shared/components/buttons/IconButton";
import { NamespaceEnum } from "@shared/i18n";

import { ColumnHeaderFilterPopover } from "./ColumnHeaderFilterPopover";

type ColumnHeaderMenuProps<TData extends RowData> = {
    setIsShowButtons: Dispatch<SetStateAction<boolean>>;
    sx?: SxProps;
} & HeaderType<TData, unknown>;

export const ColumnHeaderMenu = <TData extends RowData>(props: ColumnHeaderMenuProps<TData>) => {
    const { setIsShowButtons, sx, column, getContext } = props;

    const { t } = useTranslation(NamespaceEnum.SHARED, { keyPrefix: "table.columnHeaderMenu" });

    const setSorting = getContext().table.options.meta?.setSorting;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [filtersAnchorEl, setFiltersAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setIsShowButtons(false);
        setAnchorEl(null);
    };

    const handleSortASC = useCallback(() => {
        setSorting?.([{ id: column.id, desc: false }]);
    }, [column.id, setSorting]);

    const handleSortDESC = useCallback(() => {
        setSorting?.([{ id: column.id, desc: true }]);
    }, [column.id, setSorting]);

    const handleSortReset = useCallback(() => {
        setSorting?.([]);
    }, [setSorting]);

    const handleShowFilter = useCallback(() => {
        setAnchorEl(null);
        setFiltersAnchorEl(anchorEl);
    }, [anchorEl]);

    const handleCloseFilter = () => {
        setIsShowButtons(false);
        setFiltersAnchorEl(null);
    };

    const menuItems = useMemo(() => {
        const items = [];

        if (column.getCanSort()) {
            items.push([
                <MenuItem
                    selected={column.getIsSorted() === "asc"}
                    onClick={column.getIsSorted() === "asc" ? handleSortReset : handleSortASC}
                    key={"sortByASC"}
                    disableRipple
                >
                    <ListItemIcon>
                        <NorthOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t("sortByASC")}</ListItemText>
                </MenuItem>,
                <MenuItem
                    selected={column.getIsSorted() === "desc"}
                    onClick={column.getIsSorted() === "desc" ? handleSortReset : handleSortDESC}
                    key={"sortByDESC"}
                    disableRipple
                >
                    <ListItemIcon>
                        <SouthOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t("sortByDESC")}</ListItemText>
                </MenuItem>,
                <Divider key={"sortDivider"} />,
            ]);
        }

        if (column.getCanFilter()) {
            items.push(
                <MenuItem onClick={handleShowFilter} disableRipple key={"filter"}>
                    <ListItemIcon>
                        <FilterAltOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t("filter")}</ListItemText>
                </MenuItem>,
            );
        }

        return items;
    }, [t, column, handleShowFilter, handleSortASC, handleSortDESC, handleSortReset]);

    return (
        <>
            {menuItems.length > 0 && (
                <IconButton size="small" sx={sx} onClick={handleClick}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            )}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                {menuItems}
            </Menu>

            <ColumnHeaderFilterPopover anchorEl={filtersAnchorEl} onClose={handleCloseFilter} {...props} />
        </>
    );
};
