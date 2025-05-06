import { useFieldArray } from "react-hook-form";
import { RowData } from "@tanstack/react-table";

import { useForm } from "@shared/components/form/Form";

import { FiltersSchema } from "../schemas";
import { ColumnHeaderFilterPopoverProps, FilterFormValues } from "../types";

export const useColumnHeaderFilterPopover = <TData extends RowData>(props: ColumnHeaderFilterPopoverProps<TData>) => {
    const { onClose, column, getContext } = props;

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
    const { control, reset } = formMethods;
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

    return {
        formMethods,
        filters,
        columns,
        handlers: {
            submit: handleSubmit,
            addFilter: handleAddFilter,
            deleteFilter: handleDeleteFilter,
            reset: handleReset,
        },
    };
};
