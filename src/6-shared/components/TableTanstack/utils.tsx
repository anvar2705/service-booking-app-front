import { Checkbox } from "@mui/material";
import { ColumnDef, RowData } from "@tanstack/react-table";

import { ROW_SELECTION_COLUMN_ID } from "./constants";
import { ValidRowModel } from "./types";

export const getRowIdDefault = (row: ValidRowModel, index: number) =>
    row?.id?.toString() ?? row?.uuid ?? index.toString();

export const getRowSelectionColumn = <RecordType extends RowData>(): ColumnDef<RecordType> => ({
    id: ROW_SELECTION_COLUMN_ID,
    header: ({ table }) => (
        <Checkbox
            {...{
                checked: table.getIsAllRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
            }}
        />
    ),
    cell: ({ row }) => (
        <div className="px-1">
            <Checkbox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    onChange: row.getToggleSelectedHandler(),
                }}
            />
        </div>
    ),
    size: 62,
});
