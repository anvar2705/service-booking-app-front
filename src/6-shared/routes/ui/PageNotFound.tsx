import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import { Result } from "@shared/components/Result";

import { useStaticNavigate } from "../logic/useStaticNavigate";

export function PageNotFound() {
    const { t } = useTranslation();
    const navigate = useStaticNavigate();

    return (
        <Result
            title={t("pageNotFound.title")}
            subTitle={t("pageNotFound.description")}
            extra={
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        void navigate("/", { replace: true });
                    }}
                >
                    {t("backToHomePage")}
                </Button>
            }
        />
    );
}
