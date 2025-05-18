import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

import { useForm } from "@shared/components/form/Form";
import { NamespaceEnum } from "@shared/i18n";

import { signInMutationOptions } from "../api/signIn";
import { BaseLoginSchema } from "../schemas";
import { LoginFormValues } from "../types";

export const useSignInForm = () => {
    const { t } = useTranslation(NamespaceEnum.AUTHENTICATION);

    const formMethods = useForm({
        schema: BaseLoginSchema,
    });

    const { mutateAsync: signIn, isPending } = useMutation(signInMutationOptions);

    const handleSignIn = ({ data }: { data: LoginFormValues }) => {
        signIn(data);
    };

    return {
        t,
        formMethods,
        isPending,
        handlers: {
            signIn: handleSignIn,
        },
    };
};
