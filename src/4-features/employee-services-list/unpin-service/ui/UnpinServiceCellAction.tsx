import { useTranslation } from "react-i18next";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { EmployeeModel, unpinServiceMutationOptions } from "@entities/employee";
import { ServiceModel } from "@entities/service";
import { IconButton } from "@shared/components/buttons/IconButton";
import { ConfirmDialog } from "@shared/components/ConfirmDialog";
import { NamespaceEnum } from "@shared/i18n";

type UnpinServiceCellActionProps = {
    employeeId: EmployeeModel["id"];
    service: ServiceModel;
};

export const UnpinServiceCellAction = (props: UnpinServiceCellActionProps) => {
    const { employeeId, service } = props;

    const { t } = useTranslation(NamespaceEnum.EMPLOYEE);

    const { mutateAsync: unpinService, isPending } = useMutation(unpinServiceMutationOptions);

    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteEmployee = () => {
        unpinService({ employeeId, uuid: service.uuid }).then(() => {
            enqueueSnackbar(t("servicesList.successUnpinServiceMessage"), { variant: "success" });
        });
    };

    return (
        <ConfirmDialog
            translations={{
                title: t("servicesList.unpinServiceConfirmTitle", { serviceName: service.name }),
                confirm: t("forms.delete"),
                cancel: t("forms.cancel"),
            }}
            icon={<ErrorOutlineOutlinedIcon color="error" />}
            onConfirm={handleDeleteEmployee}
            spinning={isPending}
        >
            <IconButton
                color="error"
                title={t("servicesList.unpinService")}
                onClick={handleDeleteEmployee}
                disabled={isPending}
            >
                <DeleteOutlineOutlinedIcon />
            </IconButton>
        </ConfirmDialog>
    );
};
