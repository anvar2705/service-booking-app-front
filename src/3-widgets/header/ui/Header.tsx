import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSignOutMutation } from "@shared/authentication/api/signOut";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { AuthenticationRoutePathEnum, useStaticNavigate } from "@shared/routes";
import { useGetAccountQuery } from "@entities/account";

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
        <AppBar
            position="static"
            sx={{
                boxShadow: "none",
                backgroundColor: "transparent",
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    height: "100%",
                    minHeight: (theme) => (upSm ? `${theme.spacing(7)} !important` : undefined),
                }}
            >
                <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2, color: "black" }}>
                    <MenuIcon />
                </IconButton>
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
