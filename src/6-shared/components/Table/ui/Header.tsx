import { useState } from "react";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import { Box, IconButton } from "@mui/material";
import { flexRender, Header as HeaderType, RowData } from "@tanstack/react-table";

import sx from "./Table.sx";

export const Header = <TData extends RowData>(props: HeaderType<TData, unknown>) => {
    const { column, isPlaceholder, getSize, getContext, getResizeHandler } = props;

    const [isShowSortBtn, setIsShowSortBtn] = useState(false);

    return (
        <Box
            onMouseEnter={() => setIsShowSortBtn(true)}
            onMouseLeave={() => setIsShowSortBtn(false)}
            sx={{ ...sx.th, width: getSize() }}
        >
            {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}

            <Box sx={{ mr: 2 }}>
                {column.getCanSort() && (
                    <IconButton onClick={column.getToggleSortingHandler()}>
                        {isShowSortBtn && column.getIsSorted() === false && <NorthOutlinedIcon />}
                        {column.getIsSorted() === "asc" && <NorthOutlinedIcon />}
                        {column.getIsSorted() === "desc" && <SouthOutlinedIcon />}
                    </IconButton>
                )}
            </Box>

            <Box sx={sx.resizer} onMouseDown={getResizeHandler()} onTouchStart={getResizeHandler()} />
        </Box>
    );
};
