import { useEffect } from "react";
import { Button, Stack } from "@mui/material";

import { LoadingButton } from "@shared/components/buttons/LoadingButton";
import { Form } from "@shared/components/form/Form";
import { SelectField } from "@shared/components/form/SelectField";
import { TextField } from "@shared/components/form/TextField";

import { DURATION_OPTIONS } from "../constants";
import { useServiceForm } from "../logic/useServiceForm";
import { ServiceFormProps } from "../types";

export const ServiceForm = (props: ServiceFormProps) => {
    const { isSubmitting } = props;
    const { t, formMethods, isSaving, handlers } = useServiceForm(props);
    const {
        formState: { errors },
    } = formMethods;

    useEffect(() => {
        console.log("errors", errors);
    }, [errors]);

    return (
        <Form formMethods={formMethods} onSubmit={handlers.submit}>
            <Stack spacing={2} sx={{ maxWidth: 500 }}>
                <TextField name={"name"} label={t("name")} />

                <TextField name={"price_from"} label={t("priceFrom")} type="number" />

                <TextField name={"price_to"} label={t("priceTo")} type="number" />

                <SelectField name={"duration"} label={t("duration")} options={DURATION_OPTIONS} />

                <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
                    <LoadingButton type="submit" loading={isSaving || isSubmitting}>
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
