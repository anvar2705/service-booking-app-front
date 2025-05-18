import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { Link } from "@tanstack/react-router";

import { Result } from "@shared/components/Result";

export function PageNotFound() {
    const { t } = useTranslation();

    return (
        <Result
            title={t("pageNotFound.title")}
            subTitle={t("pageNotFound.description")}
            extra={
                <Link to={"/"} replace>
                    <Button color="primary" variant="contained">
                        {t("backToHomePage")}
                    </Button>
                </Link>
            }
        />
    );
}
