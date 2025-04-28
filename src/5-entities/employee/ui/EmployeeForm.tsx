import { Button, Stack, Typography } from "@mui/material";

import { LoadingButton } from "@shared/components/buttons/LoadingButton";
import { Form } from "@shared/components/form/Form";
import { Password } from "@shared/components/form/Password";
import { TextField } from "@shared/components/form/TextField";
import { FormModeEnum } from "@shared/routes";

import { useEmployeeForm } from "../logic/useEmployeeForm";
import { EmployeeFormProps } from "../types";

export const EmployeeForm = (props: EmployeeFormProps) => {
    const { mode } = props;

    const { t, formMethods, isSaving, handlers } = useEmployeeForm(props);

    return (
        <Form formMethods={formMethods} onSubmit={handlers.submit}>
            <Typography variant="h1" sx={{ mb: 2 }}>
                {mode === FormModeEnum.ADD ? t("addingTitle") : t("editingTitle")}
            </Typography>

            <Stack spacing={2} sx={{ maxWidth: 500 }}>
                <TextField
                    name={"username"}
                    label={t("username")}
                    slotProps={{
                        htmlInput: {
                            autoComplete: "new-password",
                        },
                    }}
                />

                <TextField name={"email"} label={t("email")} />

                <Password
                    name={"password"}
                    label={t("password")}
                    slotProps={{
                        htmlInput: {
                            autoComplete: "new-password",
                        },
                    }}
                />

                <TextField name={"name"} label={t("name")} />

                <TextField name={"surname"} label={t("surname")} />

                <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
                    <LoadingButton type="submit" loading={isSaving}>
                        {t("save")}
                    </LoadingButton>
                    <Button variant="text" onClick={handlers.close}>
                        {t("close")}
                    </Button>
                </Stack>
            </Stack>
        </Form>
    );
};
