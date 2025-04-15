import { type PropsWithChildren,useMemo } from "react";
import { createTheme,CssBaseline, ThemeProvider as MaterialThemeProvider } from "@mui/material";

import { useLocale } from "@shared/i18n";
import { LinkBehavior } from "@shared/routes/ui/LinkBehavior";

export function ThemeProvider({ children }: PropsWithChildren) {
    const locale = useLocale();

    const theme = useMemo(
        () =>
            createTheme(
                {
                    components: {
                        MuiLink: { defaultProps: { component: LinkBehavior } },
                        MuiButtonBase: { defaultProps: { LinkComponent: LinkBehavior } },
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
                        MuiSkeleton: {
                            defaultProps: {
                                variant: "rounded",
                            },
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
