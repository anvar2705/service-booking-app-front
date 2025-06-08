import { EditServiceFormValues, ServiceFormValues } from "./types";

export function isEditServiceFormValues(data: ServiceFormValues): data is EditServiceFormValues {
    return Boolean((data as EditServiceFormValues)?.uuid);
}
