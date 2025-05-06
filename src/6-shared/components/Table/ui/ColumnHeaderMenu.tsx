import { Dispatch, SetStateAction } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, SxProps } from "@mui/material";
import { Header as HeaderType, RowData } from "@tanstack/react-table";

import { IconButton } from "@shared/components/buttons/IconButton";

import { useColumnHeaderMenu } from "../logic/useColumnHeaderMenu";

import { ColumnHeaderFilterPopover } from "./ColumnHeaderFilterPopover";

type ColumnHeaderMenuProps<RecordType extends RowData> = {
    setIsShowButtons: Dispatch<SetStateAction<boolean>>;
    sx?: SxProps;
} & HeaderType<RecordType, unknown>;

export const ColumnHeaderMenu = <RecordType extends RowData>(props: ColumnHeaderMenuProps<RecordType>) => {
    const { sx } = props;

    const { anchorEl, filtersAnchorEl, menuItems, handlers } = useColumnHeaderMenu(props);

    return (
        <>
            {menuItems.length > 0 && (
                <IconButton size="small" sx={sx} onClick={handlers.open}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            )}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handlers.close}
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

            <ColumnHeaderFilterPopover anchorEl={filtersAnchorEl} onClose={handlers.closeFilter} {...props} />
        </>
    );
};
