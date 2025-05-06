import { Box } from "@mui/material";
import { flexRender, Row as RowType, RowData } from "@tanstack/react-table";

import sx from "./Table.sx";

export const Row = <RecordType extends RowData>(props: RowType<RecordType>) => {
    const { getVisibleCells } = props;

    return (
        <Box sx={{ ...sx.tr, ...sx.row }}>
            {getVisibleCells().map((cell) => (
                <Box sx={{ ...sx.td, width: cell.column.getSize() }} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
            ))}
        </Box>
    );
};
