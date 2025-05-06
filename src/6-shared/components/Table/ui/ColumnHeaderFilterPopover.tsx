import { useId } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import {
    Button,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Popover,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import { flexRender, RowData } from "@tanstack/react-table";

import { IconButton } from "@shared/components/buttons/IconButton";
import { Form } from "@shared/components/form/Form";
import { TextField } from "@shared/components/form/TextField";
import { NamespaceEnum } from "@shared/i18n";

import { useColumnHeaderFilterPopover } from "../logic/useColumnHeaderFilterPopover";
import { ColumnHeaderFilterPopoverProps } from "../types";

export const ColumnHeaderFilterPopover = <TData extends RowData>(props: ColumnHeaderFilterPopoverProps<TData>) => {
    const { anchorEl, onClose, getContext } = props;

    const { t } = useTranslation(NamespaceEnum.SHARED, { keyPrefix: "table.columnHeaderFilterPopover" });

    const selectColumnId = useId();

    const { formMethods, filters, columns, handlers } = useColumnHeaderFilterPopover(props);

    return (
        <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            onClose={onClose}
        >
            <Form formMethods={formMethods} onSubmit={handlers.submit}>
                <Stack sx={{ p: 1, gap: 2 }}>
                    <Typography variant="h6" sx={{ pt: 1, pl: 1 }}>
                        {t("title")}
                    </Typography>

                    {filters.map((filter, index) => (
                        <Stack key={filter.id} sx={{ flexDirection: "row", alignItems: "flex-start", gap: 2 }}>
                            <Controller
                                control={formMethods.control}
                                name={`filters.${index}.id`}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <FormControl sx={{ m: 1, minWidth: 160 }} size="small" error={Boolean(error)}>
                                        <InputLabel id={`${selectColumnId}-${filter.id}`}>{t("column")}</InputLabel>
                                        <Select
                                            labelId={`${selectColumnId}-${filter.id}`}
                                            label={t("column")}
                                            value={value}
                                            onChange={(event) => {
                                                onChange(event.target.value);
                                            }}
                                        >
                                            {columns.map((c) => (
                                                <MenuItem value={c.id}>
                                                    {flexRender(c.columnDef.header, getContext())}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {Boolean(error) && <FormHelperText>{t("emptyColumnError")}</FormHelperText>}
                                    </FormControl>
                                )}
                            />

                            <TextField
                                name={`filters.${index}.value`}
                                label={t("value")}
                                slotProps={{
                                    htmlInput: {
                                        autoComplete: "new-password",
                                    },
                                }}
                                sx={{ mt: 1 }}
                            />

                            <IconButton
                                title={t("delete")}
                                onClick={handlers.deleteFilter(index)}
                                sx={{ mt: 1 }}
                                disabled={filters.length === 1}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Stack>
                    ))}

                    <Divider />

                    <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Button
                            onClick={handlers.addFilter}
                            disabled={columns.length <= filters.length}
                            variant="text"
                            startIcon={<AddIcon />}
                        >
                            {t("add")}
                        </Button>

                        <Stack sx={{ flexDirection: "row", gap: 2 }}>
                            <Button onClick={handlers.reset} variant="outlined">
                                {t("reset")}
                            </Button>
                            <Button type="submit">{t("apply")}</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Form>
        </Popover>
    );
};
