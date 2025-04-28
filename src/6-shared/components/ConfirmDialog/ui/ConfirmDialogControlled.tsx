import { type MouseEvent } from "react";
import {
    Button,
    Dialog as DialogMui,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

import { LoadingButton } from "@shared/components/buttons/LoadingButton";

import type { ConfirmDialogControlledProps } from "../types";

export function ConfirmDialogControlled(props: ConfirmDialogControlledProps) {
    const { isOpen, setIsOpen, translations, icon, onConfirm, onCancel, spinning } = props;
    const { cancel, confirm, description, title } = translations;

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
        handleClose();
        if (onCancel) {
            onCancel(event);
        }
    };

    const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
        handleClose();
        if (onConfirm) {
            onConfirm(event);
        }
    };

    return (
        <DialogMui open={isOpen} onClose={handleClose}>
            {title && (
                <DialogTitle display="flex" alignItems="center" gap={2}>
                    {icon} {title}
                </DialogTitle>
            )}
            {description && (
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                <LoadingButton onClick={handleConfirm} loading={spinning}>
                    {confirm}
                </LoadingButton>
                <Button onClick={handleCancel} variant="text">
                    {cancel}
                </Button>
            </DialogActions>
        </DialogMui>
    );
}
