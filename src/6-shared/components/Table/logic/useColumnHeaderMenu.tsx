import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import { Divider, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { RowData } from "@tanstack/react-table";

import { NamespaceEnum } from "@shared/i18n";

import { ColumnHeaderMenuProps } from "../types";

export const useColumnHeaderMenu = <TData extends RowData>(props: ColumnHeaderMenuProps<TData>) => {
    const { setIsShowButtons, column, getContext } = props;

    const { t } = useTranslation(NamespaceEnum.SHARED, { keyPrefix: "table.columnHeaderMenu" });

    const setSorting = getContext().table.options.meta?.setSorting;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [filtersAnchorEl, setFiltersAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
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

    return {
        t,
        anchorEl,
        filtersAnchorEl,
        menuItems,
        handlers: {
            open: handleOpen,
            close: handleClose,
            closeFilter: handleCloseFilter,
        },
    };
};
