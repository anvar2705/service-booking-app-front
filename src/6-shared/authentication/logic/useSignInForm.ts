import { useForm } from "@shared/components/form/Form";
import { BaseLoginSchema } from "../schemas";
import { useTranslation } from "react-i18next";
import { NamespaceEnum } from "@shared/i18n";
import { useSignInMutation } from "../api/signIn";
import { LoginFormValues } from "../types";
import { AuthenticationRoutePathEnum, useStaticNavigate } from "@shared/routes";

export const useSignInForm = () => {
    const { t } = useTranslation(NamespaceEnum.AUTHENTICATION);

    const navigate = useStaticNavigate();

    const formMethods = useForm({
        schema: BaseLoginSchema,
    });

    const { mutateAsync: signIn, isPending } = useSignInMutation();

    const handleSignIn = ({ data }: { data: LoginFormValues }) => {
        signIn(data);
    };

    const handleSignUp = () => {
        navigate(AuthenticationRoutePathEnum.AUTH_SIGN_UP);
    };

    return {
        t,
        formMethods,
        isPending,
        handlers: {
            signIn: handleSignIn,
            signUp: handleSignUp,
        },
    };
};
