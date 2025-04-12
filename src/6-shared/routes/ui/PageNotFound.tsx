import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useStaticNavigate } from "../logic/useStaticNavigate";
import { Result } from "@shared/components/Result";

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
