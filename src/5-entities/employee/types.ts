import { TypeOf } from "zod";

import { ServiceModel } from "@entities/service";
import { UserModel } from "@entities/user";
import { FormMode } from "@shared/routes";

import { AddEmployeeSchema, EditEmployeeSchema } from "./schemas";

export interface EmployeeModel {
    id: number;
    name?: string;
    surname?: string;
    patronymic?: string;
    photo_url?: string;
    user: UserModel;
}

export type EmployeeFormTitleProps = {
    mode: FormMode;
};

export type EmployeeFormProps = {
    id?: EmployeeModel["id"];
    mode: FormMode;
};

export type AddEmployeeFormValues = TypeOf<typeof AddEmployeeSchema>;
export type EditEmployeeFormValues = TypeOf<typeof EditEmployeeSchema>;
export type EmployeeFormValues = AddEmployeeFormValues | EditEmployeeFormValues;

export type UnpinServicePayload = {
    employeeId: EmployeeModel["id"];
    uuid: ServiceModel["uuid"];
};
