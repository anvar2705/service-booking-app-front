import type { MouseEvent, ReactElement, ReactNode } from "react";

export interface ConfirmDialogTranslations {
    description?: string;
    confirm: string;
    cancel: string;
    title?: string;
}

export interface ConfirmDialogControlledProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    translations: ConfirmDialogTranslations;
    icon?: ReactNode;
    onConfirm?: (e?: MouseEvent<HTMLElement>) => void;
    onCancel?: (e?: MouseEvent<HTMLElement>) => void;
    spinning?: boolean;
}

export type ConfirmDialogProps = Omit<ConfirmDialogControlledProps, "isOpen" | "setIsOpen"> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any>;
};
