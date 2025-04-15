import { IconButton as IconButtonMui, type IconButtonProps,Tooltip } from "@mui/material";

export function IconButton(props: IconButtonProps) {
    const { title, disabled, onClick, children, ...iconBtnProps } = props;

    const adjustedIconBtnProps = {
        disabled,
        component: disabled ? "div" : undefined,
        onClick: disabled ? undefined : onClick,
    };

    return (
        <Tooltip title={title}>
            <IconButtonMui {...iconBtnProps} {...adjustedIconBtnProps}>
                {children}
            </IconButtonMui>
        </Tooltip>
    );
}
