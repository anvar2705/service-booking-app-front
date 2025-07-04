import { useTranslation } from "react-i18next";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { useAccount } from "@entities/account";
import { deleteEmployeeMutationOptions, EmployeeModel } from "@entities/employee";
import { IconButton } from "@shared/components/buttons/IconButton";
import { ConfirmDialog } from "@shared/components/ConfirmDialog";
import { NamespaceEnum } from "@shared/i18n";
type DeleteEmployeeCellActionProps = {
    employee: EmployeeModel;
};

export const DeleteEmployeeCellAction = (props: DeleteEmployeeCellActionProps) => {
    const {
        employee: {
            id,
            user: { username },
        },
    } = props;

    const { t } = useTranslation(NamespaceEnum.EMPLOYEE);

    const { mutateAsync: deleteEmployee, isPending } = useMutation(deleteEmployeeMutationOptions);

    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteEmployee = () => {
        deleteEmployee(id).then(() => {
            enqueueSnackbar(t("employeesList.successDeleteEmployeeMessage"), { variant: "success" });
        });
    };

    const data = useAccount();

    return (
        <ConfirmDialog
            translations={{
                title: t("employeesList.deleteEmployeeConfirmTitle", { username }),
                confirm: t("form.delete"),
                cancel: t("form.cancel"),
            }}
            icon={<ErrorOutlineOutlinedIcon color="error" />}
            onConfirm={handleDeleteEmployee}
            spinning={isPending}
        >
            <IconButton
                color="error"
                title={t("employeesList.deleteEmployee")}
                onClick={handleDeleteEmployee}
                disabled={isPending || data?.id === id}
            >
                <DeleteOutlineOutlinedIcon />
            </IconButton>
        </ConfirmDialog>
    );
};
