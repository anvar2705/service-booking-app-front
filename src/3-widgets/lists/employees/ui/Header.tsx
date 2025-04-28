import { useState } from "react";
import { useTranslation } from "react-i18next";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import { Box, IconButton } from "@mui/material";
import { flexRender, Header as HeaderType } from "@tanstack/react-table";

import { EmployeeModel } from "@entities/employee";
import { NamespaceEnum } from "@shared/i18n";

import sx from "./EmployeesListWidget.sx";

export const Header = (props: HeaderType<EmployeeModel, unknown>) => {
    const { id, column, getSize, getContext, getResizeHandler } = props;

    const { t } = useTranslation(NamespaceEnum.EMPLOYEE, { keyPrefix: "table.columns" });

    const [isShowSortBtn, setIsShowSortBtn] = useState(false);

    return (
        <Box
            onMouseEnter={() => setIsShowSortBtn(true)}
            onMouseLeave={() => setIsShowSortBtn(false)}
            sx={{ ...sx.th, width: getSize() }}
        >
            {id !== "actions" ? t(id) : flexRender(column.columnDef.header, getContext())}

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
