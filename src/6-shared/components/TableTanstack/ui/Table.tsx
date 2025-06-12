import { Box } from "@mui/material";
import { RowData } from "@tanstack/react-table";

import { useTable } from "../logic/useTable";
import { TableProps } from "../types";

import { HeaderGroup } from "./HeaderGroup";
import { Pagination } from "./Pagination";
import { Row } from "./Row";
import sx from "./Table.sx";

export const Table = <RecordType extends RowData, QueryArg>(props: TableProps<RecordType, QueryArg>) => {
    const { table } = useTable(props);

    return (
        <Box sx={sx.table}>
            {table.getHeaderGroups().map((headerGroup) => (
                <HeaderGroup key={headerGroup.id} {...headerGroup} table={table} />
            ))}

            {table.getRowModel().rows.map((row) => (
                <Row key={row.id} {...row} table={table} />
            ))}

            <Pagination table={table} />
        </Box>
    );
};
