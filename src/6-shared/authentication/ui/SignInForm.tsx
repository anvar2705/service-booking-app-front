import { Box, Link, Stack, Typography } from "@mui/material";
import { useSignInForm } from "../logic/useSignInForm";
import { Form } from "@shared/components/form/Form";
import { TextField } from "@shared/components/form/TextField";
import { LoginSchemaFieldNameEnum } from "../constants";
import { Password } from "@shared/components/form/Password";
import { LoadingButton } from "@shared/components/buttons/LoadingButton";
import { AuthenticationRoutePathEnum } from "@shared/routes";

export function SignInForm() {
    const { t, formMethods, isPending, handlers } = useSignInForm();

    return (
        <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Form formMethods={formMethods} onSubmit={handlers.signIn}>
                <Stack sx={{ gap: 2 }}>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                        {t("signInForm.title")}
                    </Typography>
                    <TextField name={LoginSchemaFieldNameEnum.LOGIN} label={t("forms.login")} />
                    <Password name={LoginSchemaFieldNameEnum.PASSWORD} label={t("forms.password")} />
                    <LoadingButton loading={isPending} type={"submit"}>
                        {t("signInForm.signIn")}
                    </LoadingButton>
                    <Box>
                        <span>{t("signInForm.signUpHelperText")}</span>{" "}
                        <Link href={AuthenticationRoutePathEnum.AUTH_SIGN_UP}>{t("signInForm.signUp")}</Link>
                    </Box>
                </Stack>
            </Form>
        </Box>
    );
}
