import { useTranslation } from "react-i18next";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

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
            enqueueSnackbar(t("table.successDeleteEmployeeMessage"), { variant: "success" });
        });
    };

    return (
        <ConfirmDialog
            translations={{
                title: t("table.deleteEmployeeConfirmTitle", { username }),
                confirm: t("forms.delete"),
                cancel: t("forms.cancel"),
            }}
            icon={<ErrorOutlineOutlinedIcon color="error" />}
            onConfirm={handleDeleteEmployee}
            spinning={isPending}
        >
            <IconButton
                color="error"
                title={t("table.deleteEmployee")}
                onClick={handleDeleteEmployee}
                disabled={isPending}
            >
                <DeleteOutlineOutlinedIcon />
            </IconButton>
        </ConfirmDialog>
    );
};
