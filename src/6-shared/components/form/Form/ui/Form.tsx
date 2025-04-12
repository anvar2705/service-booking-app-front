import { type FieldValues, FormProvider, Form as RHFForm } from "react-hook-form";
import { FormProps } from "../types";

export function Form<TFieldValues extends FieldValues, TContext>(props: FormProps<TFieldValues, TContext>) {
    const { formMethods, children, ...formProps } = props;

    return (
        <FormProvider {...formMethods}>
            <RHFForm noValidate {...formProps} control={formMethods.control}>
                {children}
            </RHFForm>
        </FormProvider>
    );
}
