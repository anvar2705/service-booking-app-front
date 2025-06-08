import { useTranslation } from "react-i18next";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { EmployeeModel, unpinServiceMutationOptions } from "@entities/employee";
import { getEmployeeQueryOptions } from "@entities/employee/api/getEmployee";
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

    const { t } = useTranslation(NamespaceEnum.SERVICE);

    const { mutateAsync: unpinService, isPending } = useMutation(unpinServiceMutationOptions);

    const { enqueueSnackbar } = useSnackbar();

    const { data: employee } = useQuery(getEmployeeQueryOptions(employeeId));

    const handleDeleteEmployee = () => {
        unpinService({ employeeId, uuid: service.uuid }).then(() => {
            enqueueSnackbar(t("servicesList.successUnpinServiceMessage"), { variant: "success" });
        });
    };

    return (
        <ConfirmDialog
            translations={{
                title: t("servicesList.unpinServiceConfirmTitle", {
                    serviceName: service.name,
                    username: employee?.user.username,
                }),
                confirm: t("form.delete"),
                cancel: t("form.cancel"),
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
