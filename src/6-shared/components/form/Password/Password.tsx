import { type TextFieldVariants, InputAdornment } from "@mui/material";
import { type FieldPath, type FieldValues } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { IconButton } from "../../buttons/IconButton";
import { TextField, TextFieldProps } from "../TextField";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Password<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
    Variant extends TextFieldVariants = TextFieldVariants,
>(props: TextFieldProps<TFieldValues, TName, Variant>) {
    const { t } = useTranslation();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <TextField
            {...props}
            type={!showPassword ? "password" : "text"}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                title={t("forms.showPassword")}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
}
