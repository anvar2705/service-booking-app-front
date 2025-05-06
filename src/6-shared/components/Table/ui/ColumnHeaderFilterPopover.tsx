import { useId } from "react";
import { Controller, useFieldArray } from "react-hook-form";
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
    PopoverProps,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import { flexRender, Header as HeaderType, RowData } from "@tanstack/react-table";

import { IconButton } from "@shared/components/buttons/IconButton";
import { Form, useForm } from "@shared/components/form/Form";
import { TextField } from "@shared/components/form/TextField";
import { NamespaceEnum } from "@shared/i18n";

import { FiltersSchema } from "../schemas";
import { FilterFormValues } from "../types";

type ColumnHeaderFilterPopoverProps<TData extends RowData> = Pick<PopoverProps, "anchorEl"> &
    HeaderType<TData, unknown> & {
        onClose: () => void;
    };

export const ColumnHeaderFilterPopover = <TData extends RowData>(props: ColumnHeaderFilterPopoverProps<TData>) => {
    const { anchorEl, onClose, column, getContext } = props;

    const { t } = useTranslation(NamespaceEnum.SHARED, { keyPrefix: "table.columnHeaderFilterPopover" });

    const selectColumnId = useId();

    const columns = getContext()
        .table.getAllColumns()
        .filter((c) => c.getCanFilter());
    const columnFilters = getContext().table.options.meta?.columnFilters;
    const setColumnFilters = getContext().table.options.meta?.setColumnFilters;

    const formMethods = useForm({
        schema: FiltersSchema,
        values:
            columnFilters && columnFilters.length > 0
                ? { filters: columnFilters as { id: string; value: string }[] }
                : {
                      filters: [
                          {
                              id: column.id,
                              value: "",
                          },
                      ],
                  },
    });
    const {
        control,
        reset,
        formState: { errors },
    } = formMethods;
    const { fields: filters, append, remove } = useFieldArray({ control, name: "filters" });

    const handleSubmit = ({ data }: { data: FilterFormValues }) => {
        setColumnFilters?.(data.filters);
        onClose();
    };

    const handleReset = () => {
        reset();
        setColumnFilters?.([]);
    };

    const handleAddFilter = () => {
        if (columns.length > filters.length) {
            append({ id: "", value: "" });
        }
    };

    const handleDeleteFilter = (index: number) => () => {
        if (filters.length > 1) {
            remove(index);
        }
    };

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
            <Form formMethods={formMethods} onSubmit={handleSubmit}>
                <Stack sx={{ p: 1, gap: 2 }}>
                    <Typography variant="h6" sx={{ pt: 1, pl: 1 }}>
                        {t("title")}
                    </Typography>

                    {filters.map((filter, index) => (
                        <Stack key={filter.id} sx={{ flexDirection: "row", alignItems: "flex-start", gap: 2 }}>
                            <Controller
                                control={control}
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
                                        {errors.filters?.[index]?.id && (
                                            <FormHelperText>{t("emptyColumnError")}</FormHelperText>
                                        )}
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
                                onClick={handleDeleteFilter(index)}
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
                            onClick={handleAddFilter}
                            disabled={columns.length <= filters.length}
                            variant="text"
                            startIcon={<AddIcon />}
                        >
                            {t("add")}
                        </Button>

                        <Stack sx={{ flexDirection: "row", gap: 2 }}>
                            <Button onClick={handleReset} variant="outlined">
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
