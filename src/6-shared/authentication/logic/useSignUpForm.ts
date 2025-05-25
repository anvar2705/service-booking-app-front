import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useForm } from "@shared/components/form/Form";
import { NamespaceEnum } from "@shared/i18n";

import { signUpMutationOptions } from "../api/signUp";
import { SignUpSchema } from "../schemas";
import { SignUpFormValues } from "../types";

export const useSignUpForm = () => {
    const navigate = useNavigate();

    const { t } = useTranslation(NamespaceEnum.AUTHENTICATION);

    const formMethods = useForm({
        schema: SignUpSchema,
    });

    const { mutateAsync: signUp, isPending } = useMutation(signUpMutationOptions);

    const handleSignUp = ({ data }: { data: SignUpFormValues }) => {
        signUp(data).then(() => {
            navigate({ to: "/" });
        });
    };

    return {
        t,
        formMethods,
        isPending,
        handlers: {
            signUp: handleSignUp,
        },
    };
};
