import { Box } from "@mui/material";
import { flexRender, RowData } from "@tanstack/react-table";

import { useTable } from "../logic/useTable";
import { TableProps } from "../types";

import { ColumnHeader } from "./ColumnHeader";
import { Pagination } from "./Pagination";
import sx from "./Table.sx";

export const Table = <TData extends RowData, QueryArg>(props: TableProps<TData, QueryArg>) => {
    const { table } = useTable(props);

    return (
        <Box sx={sx.table}>
            {table.getHeaderGroups().map((headerGroup) => (
                <Box sx={sx.tr} key={headerGroup.id}>
                    {headerGroup.headers.map((headerProps) => (
                        <ColumnHeader {...headerProps} key={headerProps.id} />
                    ))}
                </Box>
            ))}

            {table.getRowModel().rows.map((row) => (
                <Box sx={sx.tr} key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <Box sx={{ ...sx.td, width: cell.column.getSize() }} key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Box>
                    ))}
                </Box>
            ))}

            <Pagination table={table} />
        </Box>
    );
};
