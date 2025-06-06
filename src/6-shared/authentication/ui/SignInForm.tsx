import { Box, Stack, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

import { LoadingButton } from "@shared/components/buttons/LoadingButton";
import { Form } from "@shared/components/form/Form";
import { Password } from "@shared/components/form/Password";
import { TextField } from "@shared/components/form/TextField";

import { AuthSchemaFieldNameEnum } from "../constants";
import { useSignInForm } from "../logic/useSignInForm";

export function SignInForm() {
    const { t, formMethods, isPending, handlers } = useSignInForm();

    return (
        <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Form formMethods={formMethods} onSubmit={handlers.signIn}>
                <Stack sx={{ gap: 2 }}>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                        {t("signInForm.title")}
                    </Typography>
                    <TextField name={AuthSchemaFieldNameEnum.USERNAME} label={t("forms.login")} />
                    <Password name={AuthSchemaFieldNameEnum.PASSWORD} label={t("forms.password")} />
                    <LoadingButton loading={isPending} type={"submit"}>
                        {t("signInForm.signIn")}
                    </LoadingButton>
                    <Box>
                        <span>{t("signInForm.signUpHelperText")}</span>{" "}
                        <Link to={"/auth/sign-up"} style={{ textDecoration: "underline" }}>
                            {t("signInForm.signUp")}
                        </Link>
                    </Box>
                </Stack>
            </Form>
        </Box>
    );
}
