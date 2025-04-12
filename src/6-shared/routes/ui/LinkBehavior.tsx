import { forwardRef } from "react";
import { Link as RouterLink, type LinkProps } from "react-router";

export const LinkBehavior = forwardRef<HTMLAnchorElement, Omit<LinkProps, "to"> & { href: LinkProps["to"] }>(
    function LinkBehaviorWithRef(props, ref) {
        const { href, ...other } = props;
        // Map href (Material UI) -> to (react-router)
        return <RouterLink ref={ref} to={href} {...other} />;
    },
);
