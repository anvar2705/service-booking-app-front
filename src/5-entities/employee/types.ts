import { UserModel } from "@entities/user";

export interface EmployeeModel {
    id: number;
    name?: string;
    surname?: string;
    patronymic?: string;
    photo_url?: string;
    user: UserModel;
}
