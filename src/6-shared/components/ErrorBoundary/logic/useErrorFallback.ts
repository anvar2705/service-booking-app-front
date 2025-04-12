import { useState } from "react";
import { DYNAMICALLY_IMPORTED_MODULE_ERROR_MESSAGE } from "../constants";
import type { ErrorFallbackProps } from "../types";
import { helpers } from "@shared/utils";

export function useErrorFallback(props: ErrorFallbackProps) {
    const { error, resetErrorBoundary, translations } = props;
    const { resetText: resetTextFromProps, dynamicallyImportedModuleError, showDetails } = translations;

    const [isDetailsShowed, setIsDetailsShowed] = useState(false);

    const { message, stack } = error;

    let reset = resetErrorBoundary;
    let title = error.title;
    let resetText = resetTextFromProps;
    let showDetailsText = showDetails;

    if (message?.toLowerCase().includes(DYNAMICALLY_IMPORTED_MODULE_ERROR_MESSAGE)) {
        title = dynamicallyImportedModuleError.title;
        resetText = dynamicallyImportedModuleError.resetText;
        showDetailsText = dynamicallyImportedModuleError.details;
        reset = helpers.reload;
    }

    return {
        title,
        isDetailsShowed,
        setIsDetailsShowed,
        reset,
        resetText,
        showDetailsText,
        message,
        stack,
    };
}
