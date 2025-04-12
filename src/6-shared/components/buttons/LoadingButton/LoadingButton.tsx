import { Button, type ButtonProps, CircularProgress } from "@mui/material";

export type LoadingButtonProps = ButtonProps & { loading?: boolean };

export function LoadingButton(props: LoadingButtonProps) {
    const { loading, ...buttonProps } = props;

    return (
        <Button
            {...buttonProps}
            startIcon={loading ? <CircularProgress color="inherit" size={16} /> : undefined}
             
            disabled={loading || buttonProps.disabled}
        />
    );
}
