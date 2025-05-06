import { useState } from "react";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import { Box, IconButton } from "@mui/material";
import { flexRender, RowData } from "@tanstack/react-table";

import { COLUMN_HEADER_CLASSNAME } from "../constants";
import { ColumnHeaderProps } from "../types";

import { ColumnHeaderMenu } from "./ColumnHeaderMenu";
import sx from "./Table.sx";

export const ColumnHeader = <RecordType extends RowData>(props: ColumnHeaderProps<RecordType>) => {
    const { column, isPlaceholder, getSize, getContext, getResizeHandler } = props;

    const [isShowButtons, setIsShowButtons] = useState(false);

    const setSorting = getContext().table.options.meta?.setSorting;
    const disableColumnReorder = getContext().table.options.meta?.disableColumnReorder;

    const handleToggleSorting = () => {
        switch (column.getIsSorted()) {
            case false: {
                setSorting?.([{ id: column.id, desc: false }]);
                return;
            }
            case "asc": {
                setSorting?.([{ id: column.id, desc: true }]);
                return;
            }
            case "desc": {
                setSorting?.([]);
                return;
            }
        }
    };

    return (
        <>
            <Box
                id={`${COLUMN_HEADER_CLASSNAME}-${column.id}`}
                className={COLUMN_HEADER_CLASSNAME}
                onMouseEnter={() => setIsShowButtons(true)}
                onMouseLeave={() => setIsShowButtons(false)}
                sx={{ ...sx.th }}
                style={{ width: getSize() }}
            >
                <Box draggable={!disableColumnReorder}>
                    {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}
                </Box>

                <Box>
                    {column.getCanSort() && (
                        <IconButton size="small" onClick={handleToggleSorting}>
                            {isShowButtons && column.getIsSorted() === false && <NorthOutlinedIcon fontSize="small" />}
                            {column.getIsSorted() === "asc" && <NorthOutlinedIcon fontSize="small" />}
                            {column.getIsSorted() === "desc" && <SouthOutlinedIcon fontSize="small" />}
                        </IconButton>
                    )}

                    <ColumnHeaderMenu
                        sx={{ mr: 1, flexShrink: 0, visibility: isShowButtons ? "visible" : "hidden" }}
                        setIsShowButtons={setIsShowButtons}
                        {...props}
                    />
                </Box>

                <Box sx={sx.resizer} onMouseDown={getResizeHandler()} onTouchStart={getResizeHandler()} />
            </Box>
        </>
    );
};
