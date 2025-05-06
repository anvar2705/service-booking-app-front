import { DragEvent, useState } from "react";
import { Box } from "@mui/material";
import { HeaderGroup as HeaderGroupType, RowData, Table } from "@tanstack/react-table";

import { COLUMN_HEADER_CLASSNAME } from "../constants";

import { ColumnHeader } from "./ColumnHeader";
import sx from "./Table.sx";

export const HeaderGroup = <RecordType extends RowData>(
    props: HeaderGroupType<RecordType> & { table: Table<RecordType> },
) => {
    const { headers, table } = props;

    const setColumnOrder = table.options.meta?.setColumnOrder;

    const [activeId, setActiveId] = useState<string | null>(null);

    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        setActiveId((event.target as HTMLElement).id.split("-")[1]);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (setColumnOrder && activeId) {
            const overId = (event.target as HTMLElement).closest(`.${COLUMN_HEADER_CLASSNAME}`)?.id.split("-")[1];

            if (overId === activeId) return;

            setColumnOrder((prev) => {
                const columnOrderNew = [...prev];
                const activeIndex = prev.findIndex((c) => c === activeId);
                const overIndex = prev.findIndex((c) => c === overId);
                columnOrderNew.splice(overIndex, 0, columnOrderNew.splice(activeIndex, 1)[0]);

                return columnOrderNew;
            });
        }
    };

    return (
        <Box sx={sx.tr} onDragStart={handleDragStart} onDragOver={handleDragOver}>
            {headers.map((headerProps) => (
                <ColumnHeader {...headerProps} key={headerProps.id} />
            ))}
        </Box>
    );
};
