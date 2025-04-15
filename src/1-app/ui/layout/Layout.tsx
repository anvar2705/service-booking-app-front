import { PropsWithChildren } from "react";

import { useIsAuthenticated } from "@shared/authentication";
import { Header } from "@widgets/header";
import { MainMenu } from "@widgets/main-menu";

import { Content } from "./Content";

export const Layout = (props: PropsWithChildren) => {
    const { children } = props;

    const isAuthenticated = useIsAuthenticated();

    return isAuthenticated ? (
        <>
            <Header />
            <MainMenu />
            <Content>{children}</Content>
        </>
    ) : (
        children
    );
};
