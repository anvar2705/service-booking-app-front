import { useState } from "react";
import { useTranslation } from "react-i18next";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, IconButton, Menu, MenuItem, Toolbar, useMediaQuery, useTheme } from "@mui/material";

import { useGetAccountQuery } from "@entities/account";
import { useSignOutMutation } from "@shared/authentication/api/signOut";
import { AuthenticationRoutePathEnum, useStaticNavigate } from "@shared/routes";
import { toggleMainMenuCollapsed,useMainMenuCollapsed } from "@widgets/main-menu";

import { AppBar } from "./AppBar";

export const Header = () => {
    const { t } = useTranslation();

    const navigate = useStaticNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const { mutateAsync: signOut } = useSignOutMutation();
    const {
        data: account,
        isSuccess: isSuccessAccount,
        isFetching: isFetchingAccount,
        isError: isErrorAccount,
    } = useGetAccountQuery();

    const isMainMenuCollapsed = useMainMenuCollapsed();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSignOut = () => {
        navigate(AuthenticationRoutePathEnum.AUTH_SIGN_IN);
        signOut();
    };

    const theme = useTheme();
    const upSm = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <AppBar position="static" isMainMenuCollapsed={isMainMenuCollapsed}>
            <Toolbar
                sx={{
                    justifyContent: isMainMenuCollapsed ? "space-between" : "flex-end",
                    backgroundColor: "white",
                    height: "100%",
                    minHeight: (theme) => (upSm ? `${theme.spacing(7)} !important` : undefined),
                }}
            >
                {isMainMenuCollapsed && (
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2, color: "black" }}
                        onClick={toggleMainMenuCollapsed}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Button
                    onClick={handleAccountMenu}
                    startIcon={<AccountCircleOutlinedIcon />}
                    disableRipple
                    variant="outlined"
                    sx={{ color: "black", border: (theme) => `1px solid ${theme.palette.divider}` }}
                >
                    {isFetchingAccount && t("loading")}
                    {isSuccessAccount &&
                        (account?.name ? `${account.name} ${account.surname}` : account?.user.username)}
                    {isErrorAccount && "error"}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{
                        "& ul": {
                            p: 0,
                        },
                    }}
                >
                    <MenuItem onClick={handleSignOut}>{t("header.signOut")}</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};
