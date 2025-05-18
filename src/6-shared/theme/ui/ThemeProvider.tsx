import { type PropsWithChildren, useMemo } from "react";
import { createTheme, CssBaseline, ThemeProvider as MaterialThemeProvider } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";

import { useLocale } from "@shared/i18n";

export function ThemeProvider({ children }: PropsWithChildren) {
    const locale = useLocale();

    const theme = useMemo(
        () =>
            createTheme(
                {
                    components: {
                        MuiLink: { defaultProps: { component: RouterLink } },
                        MuiButtonBase: { defaultProps: { LinkComponent: RouterLink } },
                        MuiButton: {
                            defaultProps: {
                                variant: "contained",
                            },
                            styleOverrides: {
                                root: {
                                    textTransform: "none",
                                },
                            },
                        },
                        MuiTextField: {
                            defaultProps: {
                                size: "small",
                                fullWidth: true,
                            },
                        },
                        MuiTypography: {
                            variants: [
                                {
                                    props: {
                                        variant: "h1",
                                    },
                                    style: {
                                        fontSize: 32,
                                        marginBottom: 12,
                                    },
                                },
                            ],
                        },
                        MuiSkeleton: {
                            defaultProps: {
                                variant: "rounded",
                            },
                        },
                        MuiTabs: {
                            styleOverrides: { root: { minHeight: 40, marginBottom: 16 } },
                        },
                        MuiTab: {
                            defaultProps: { disableRipple: true, disableTouchRipple: true },
                            styleOverrides: { root: { textTransform: "none", minHeight: 40 } },
                        },
                    },
                },
                ...locale,
            ),
        [locale],
    );

    return (
        <MaterialThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MaterialThemeProvider>
    );
}
