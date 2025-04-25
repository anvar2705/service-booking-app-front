import { CompanyModel } from "@entities/company";
import { EmployeeModel } from "@entities/employee";

export type AccountModel = EmployeeModel & {
    company: CompanyModel;
};
