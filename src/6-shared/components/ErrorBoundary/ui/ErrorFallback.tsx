import { useEffect, useRef } from "react";
import { Button, Stack } from "@mui/material";
import { useLocation } from "@tanstack/react-router";

import { Result } from "@shared/components/Result";

import { useErrorFallback } from "../logic/useErrorFallback";
import { ErrorFallbackProps } from "../types";

export function ErrorFallback(props: ErrorFallbackProps) {
    const { title, message, stack, isDetailsShowed, reset, resetText, setIsDetailsShowed, showDetailsText } =
        useErrorFallback(props);

    const location = useLocation();
    const errorLocation = useRef(location.pathname);

    useEffect(() => {
        if (location.pathname !== errorLocation.current) {
            reset();
        }
    }, [location.pathname, reset]);

    return (
        <Result
            title={title || message}
            subTitle={
                isDetailsShowed ? (
                    <>
                        {title && message ? <h4>{message}</h4> : null}
                        {stack ? <pre>{stack}</pre> : null}
                    </>
                ) : null
            }
            extra={
                <Stack direction="row" justifyContent="center">
                    <Stack gap={2}>
                        <Button color="primary" variant="contained" onClick={reset}>
                            {resetText}
                        </Button>

                        {!isDetailsShowed && (
                            <Button
                                color="error"
                                onClick={() => {
                                    setIsDetailsShowed(true);
                                }}
                            >
                                {showDetailsText}
                            </Button>
                        )}
                    </Stack>
                </Stack>
            }
        />
    );
}
