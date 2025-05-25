import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

import { useForm } from "@shared/components/form/Form";
import { NamespaceEnum } from "@shared/i18n";

import { signInMutationOptions } from "../api/signIn";
import { SignInSchema } from "../schemas";
import { SignInFormValues } from "../types";

export const useSignInForm = () => {
    const { t } = useTranslation(NamespaceEnum.AUTHENTICATION);

    const formMethods = useForm({
        schema: SignInSchema,
    });

    const { mutateAsync: signIn, isPending } = useMutation(signInMutationOptions);

    const handleSignIn = ({ data }: { data: SignInFormValues }) => {
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
