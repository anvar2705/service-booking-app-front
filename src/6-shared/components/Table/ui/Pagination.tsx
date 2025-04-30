import { useTranslation } from "react-i18next";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { Table } from "@tanstack/react-table";

import { IconButton } from "@shared/components/buttons/IconButton";
import { NamespaceEnum } from "@shared/i18n";

import { PAGE_SIZE_OPTIONS } from "../constants";

type PaginationProps<RecordType> = {
    table: Table<RecordType>;
};

export const Pagination = <RecordType,>(props: PaginationProps<RecordType>) => {
    const { table } = props;

    const { pageIndex, pageSize } = table.getState().pagination;

    const { t } = useTranslation(NamespaceEnum.SHARED, { keyPrefix: "table" });

    const handleChangePageSize = (event: SelectChangeEvent<number>) => {
        table.setPageSize(event.target.value as number);
    };

    return (
        <Stack sx={{ p: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                <Typography>{t("pageSizeLabel")}</Typography>

                <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                    <Select value={pageSize} onChange={handleChangePageSize}>
                        {PAGE_SIZE_OPTIONS.map((p) => (
                            <MenuItem value={p}>{p}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>

            <Typography>{`${pageIndex * pageSize + 1}-${Math.min(pageIndex * pageSize + pageSize, table.getRowCount())} ${t("fromTotal")} ${table.getRowCount()}`}</Typography>

            <IconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <ChevronLeftIcon />
            </IconButton>

            <IconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <ChevronRightIcon />
            </IconButton>
        </Stack>
    );
};
