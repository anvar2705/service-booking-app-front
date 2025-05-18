import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useSnackbar } from "notistack";

import { useAccountCompany } from "@entities/account";
import { useForm } from "@shared/components/form/Form";
import { NamespaceEnum } from "@shared/i18n";
import { FormModeEnum } from "@shared/routes";

import { getEmployeeQueryOptions } from "../api/getEmployee";
import { SaveEmployeeMutationOptions } from "../api/saveEmployee";
import { AddEmployeeSchema, EditEmployeeSchema } from "../schemas";
import { EmployeeFormProps, EmployeeFormValues } from "../types";

export const useEmployeeForm = (props: EmployeeFormProps) => {
    const { id, mode } = props;

    const { t } = useTranslation(NamespaceEnum.EMPLOYEE, { keyPrefix: "form" });

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const company = useAccountCompany();
    const { data } = useQuery({
        ...getEmployeeQueryOptions(Number(id)),
        enabled: mode === FormModeEnum.EDIT && !isNaN(Number(id)),
    });
    const { mutateAsync: saveEmployee, isPending: isSaving } = useMutation(SaveEmployeeMutationOptions);

    const formMethods = useForm({
        schema: mode === FormModeEnum.ADD ? AddEmployeeSchema : EditEmployeeSchema,
        values: data
            ? { ...data, name: data.name ?? "", username: data.user.username, email: data.user.email }
            : undefined,
    });

    const handleSubmit = ({ data }: { data: EmployeeFormValues }) => {
        if (company) {
            saveEmployee({ ...data, company_uuid: company.uuid }).then(() => {
                enqueueSnackbar({ variant: "success", message: t("successSaveEmployeeMessage") });
                navigate({ to: "/employees" });
            });
        }
    };

    const handleClose = () => {
        navigate({ to: "/employees" });
    };

    return {
        t,
        formMethods,
        isSaving,
        handlers: {
            submit: handleSubmit,
            close: handleClose,
        },
    };
};
