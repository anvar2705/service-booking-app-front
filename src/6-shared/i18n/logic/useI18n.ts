import { useContext } from "react";
import { I18nContext } from "react-i18next";

export function useI18n() {
    const { i18n } = useContext(I18nContext) || {};
    return i18n;
}
