import { SxStyles } from "@shared/utils";

export default {
    table: {
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: (theme) => theme.spacing(0.5),
    },
    tr: {
        display: "flex",
        flexDirection: "row",

        "&:not(:last-child)": {
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        },
    },
    th: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: "0.5rem",
        justifyContent: "space-between",
    },
    td: {
        padding: "0.5rem",
        display: "flex",
        alignItems: "center",
    },
    row: {
        "&:hover": {
            backgroundColor: (theme) => theme.palette.action.hover,
        },
    },
    selected: {
        backgroundColor: (theme) => theme.palette.action.hover,
    },
    resizer: {
        position: "absolute",
        right: 0,
        height: "100%",
        width: "12px",
        userSelect: "none",
        touchAction: "none",
        cursor: "col-resize",

        "&:after": {
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1px",
            height: "60%",
            backgroundColor: (theme) => theme.palette.divider,
            content: `""`,
            display: "block",
            borderRadius: "6px",
        },

        "&:hover": {
            "&:after": {
                width: "4px",
                backgroundColor: (theme) => theme.palette.primary.main,
                opacity: 0.6,
            },
        },
    },
} satisfies SxStyles;
