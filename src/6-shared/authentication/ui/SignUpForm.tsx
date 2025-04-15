import { Box, Link, Stack, Typography } from "@mui/material";

import { LoadingButton } from "@shared/components/buttons/LoadingButton";
import { Form } from "@shared/components/form/Form";
import { Password } from "@shared/components/form/Password";
import { TextField } from "@shared/components/form/TextField";
import { AuthenticationRoutePathEnum } from "@shared/routes";

import { LoginSchemaFieldNameEnum } from "../constants";
import { useSignUpForm } from "../logic/useSignUpForm";

export function SignUpForm() {
    const { t, formMethods, isPending, handlers } = useSignUpForm();

    return (
        <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Form formMethods={formMethods} onSubmit={handlers.signIn}>
                <Stack sx={{ gap: 2 }}>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                        {t("signUpForm.title")}
                    </Typography>
                    <TextField name={LoginSchemaFieldNameEnum.LOGIN} label={t("forms.login")} />
                    <Password name={LoginSchemaFieldNameEnum.PASSWORD} label={t("forms.password")} />
                    <Password
                        name={LoginSchemaFieldNameEnum.PASSWORD_CONFIRMATION}
                        label={t("forms.password_confirmation")}
                    />
                    <LoadingButton loading={isPending} type={"submit"}>
                        {t("signUpForm.signUp")}
                    </LoadingButton>
                    <Box>
                        <span>{t("signUpForm.signInHelperText")}</span>{" "}
                        <Link href={AuthenticationRoutePathEnum.AUTH_SIGN_IN}>{t("signUpForm.signIn")}</Link>
                    </Box>
                </Stack>
            </Form>
        </Box>
    );
}
