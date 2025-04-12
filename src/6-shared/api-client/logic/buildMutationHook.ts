import { type DefaultError, useMutation, type UseMutationOptions } from "@tanstack/react-query";

export const buildMutationHook = <TData = unknown, TError = DefaultError, TVariables = void, TContext = unknown>(
    buildMutationHookOptions: UseMutationOptions<TData, TError, TVariables, TContext>,
) => {
    return (
        options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn" | "onSuccess" | "onError">,
    ) => {
        return useMutation({
            ...buildMutationHookOptions,
            ...options,
        });
    };
};
