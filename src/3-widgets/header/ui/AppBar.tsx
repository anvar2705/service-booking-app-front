import { styled, AppBar as MuiAppBar, AppBarProps as MuiAppBarProps } from "@mui/material";
import { DRAWER_WIDTH } from "@widgets/main-menu";

interface AppBarProps extends MuiAppBarProps {
    isMainMenuCollapsed?: boolean;
}

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "isMainMenuCollapsed",
})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ isMainMenuCollapsed }) => !isMainMenuCollapsed,
            style: {
                width: `calc(100% - ${DRAWER_WIDTH}px)`,
                marginLeft: `${DRAWER_WIDTH}px`,
                transition: theme.transitions.create(["margin", "width"], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));
