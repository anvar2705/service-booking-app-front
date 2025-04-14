import { useIsAuthenticated } from "@shared/authentication";
import { Header } from "@widgets/header";
import { PropsWithChildren } from "react";

export const Layout = (props: PropsWithChildren) => {
    const { children } = props;

    const isAuthenticated = useIsAuthenticated();

    return isAuthenticated ? (
        <>
            <Header />
            {children}
        </>
    ) : (
        children
    );
};
