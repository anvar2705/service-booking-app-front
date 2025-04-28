import { TypeOf } from "zod";

import { UserModel } from "@entities/user";

import { AddEmployeeSchema, EditEmployeeSchema } from "./schemas";

export interface EmployeeModel {
    id: number;
    name?: string;
    surname?: string;
    patronymic?: string;
    photo_url?: string;
    user: UserModel;
}

export type EmployeeFormProps = {
    id?: string;
    mode?: string;
};

export type AddEmployeeFormValues = TypeOf<typeof AddEmployeeSchema>;
export type EditEmployeeFormValues = TypeOf<typeof EditEmployeeSchema>;
export type EmployeeFormValues = AddEmployeeFormValues | EditEmployeeFormValues;
