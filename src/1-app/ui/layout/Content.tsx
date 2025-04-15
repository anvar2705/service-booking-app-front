import { PropsWithChildren } from "react";
import { styled } from "@mui/material";

import { useMainMenuCollapsed } from "@widgets/main-menu";
import { DRAWER_WIDTH } from "@widgets/main-menu";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "isMainMenuCollapsed" })<{
    isMainMenuCollapsed?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `${DRAWER_WIDTH}px`,
    variants: [
        {
            props: ({ isMainMenuCollapsed }) => isMainMenuCollapsed,
            style: {
                transition: theme.transitions.create("margin", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}));

export const Content = (props: PropsWithChildren) => {
    const { children } = props;

    const isMainMenuCollapsed = useMainMenuCollapsed();

    return <Main isMainMenuCollapsed={isMainMenuCollapsed}>{children}</Main>;
};
