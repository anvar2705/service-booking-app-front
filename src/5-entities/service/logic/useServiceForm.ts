import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useSnackbar } from "notistack";

import { useAccountCompany } from "@entities/account";
import { useForm } from "@shared/components/form/Form";
import { NamespaceEnum } from "@shared/i18n";
import { FormModeEnum } from "@shared/routes";

import { getServiceQueryOptions } from "../api/getService";
import { SaveServiceMutationOptions } from "../api/saveService";
import { NewServiceSchema, ServiceSchema } from "../schemas";
import { ServiceFormProps, ServiceFormValues } from "../types";

export const useServiceForm = (props: ServiceFormProps) => {
    const { uuid, mode, onSave } = props;

    const { t } = useTranslation(NamespaceEnum.SERVICE, { keyPrefix: "form" });

    const router = useRouter();

    const { enqueueSnackbar } = useSnackbar();

    const company = useAccountCompany();
    const { data } = useQuery({
        ...getServiceQueryOptions(uuid ?? null),
        enabled: Boolean(mode === FormModeEnum.EDIT && uuid),
    });
    const { mutateAsync: saveService, isPending: isSaving } = useMutation(SaveServiceMutationOptions);

    const formMethods = useForm({
        schema: mode === FormModeEnum.ADD ? NewServiceSchema : ServiceSchema,
        values: data ?? undefined,
        defaultValues: { company_uuid: company?.uuid },
    });

    const handleClose = () => {
        router.history.back();
    };

    const handleSubmit = ({ data }: { data: ServiceFormValues }) => {
        if (company) {
            saveService(data).then((serviceModelData) => {
                enqueueSnackbar({ variant: "success", message: t("successSaveServiceMessage") });
                onSave?.(serviceModelData);
                handleClose();
            });
        }
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
