import { Box } from "@mui/material";
import { flexRender, RowData } from "@tanstack/react-table";

import { RowProps } from "../types";

import sx from "./Table.sx";

export const Row = <RecordType extends RowData>(props: RowProps<RecordType>) => {
    const { getVisibleCells, getIsSelected, getToggleSelectedHandler, table } = props;

    const checkboxSelection = table.options.meta?.checkboxSelection;

    return (
        <Box
            sx={{ ...sx.tr, ...sx.row, ...(getIsSelected() && sx.selected) }}
            onClick={!checkboxSelection ? getToggleSelectedHandler() : undefined}
        >
            {getVisibleCells().map((cell) => (
                <Box sx={{ ...sx.td, width: cell.column.getSize() }} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
            ))}
        </Box>
    );
};
