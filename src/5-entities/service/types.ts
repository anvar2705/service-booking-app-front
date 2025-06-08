import { TypeOf } from "zod";

import { EmployeeModel } from "@entities/employee";
import { FormMode } from "@shared/routes";
import { WorkflowDate } from "@shared/utils";

import { ServiceTypeEnum } from "./constants";
import { NewServiceSchema, ServiceSchema } from "./schemas";

export interface ServiceModel extends WorkflowDate {
    uuid: string;
    name: string;
    price_from: number;
    price_to: number | null;
    duration: number;
    type: ServiceType;
    company_uuid: string;
}

export type ServiceType = (typeof ServiceTypeEnum)[keyof typeof ServiceTypeEnum];

export type ServiceFormProps = {
    uuid?: ServiceModel["uuid"];
    mode: FormMode;
    onSave?: (data: ServiceModel) => void;
    isSubmitting?: boolean;
};

export type ServiceFormTitleProps = {
    mode: FormMode;
    employeeId?: EmployeeModel["id"];
};

export type AddServiceFormValues = TypeOf<typeof NewServiceSchema>;
export type EditServiceFormValues = TypeOf<typeof ServiceSchema>;
export type ServiceFormValues = AddServiceFormValues | EditServiceFormValues;
