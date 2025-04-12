import type { TextFieldProps as MuiTextFieldProps, TextFieldVariants } from "@mui/material";
import type { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";

export type TextFieldProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
    Variant extends TextFieldVariants = TextFieldVariants
> = UseControllerProps<TFieldValues, TName> & MuiTextFieldProps<Variant>;
