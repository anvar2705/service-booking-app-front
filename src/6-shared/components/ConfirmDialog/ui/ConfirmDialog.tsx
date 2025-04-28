import { cloneElement, useCallback,useState } from "react";

import type { ConfirmDialogProps } from "../types";

import { ConfirmDialogControlled } from "./ConfirmDialogControlled";

export function ConfirmDialog(props: ConfirmDialogProps) {
    const { children, ...dialogProps } = props;

    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);

    const renderChildren = useCallback(() => {
        return cloneElement(children, {
            onClick: open,
        });
    }, [open, children]);

    return (
        <>
            {renderChildren()}
            <ConfirmDialogControlled isOpen={isOpen} setIsOpen={setIsOpen} {...dialogProps} />
        </>
    );
}
