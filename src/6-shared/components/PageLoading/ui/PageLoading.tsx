import { Box, CircularProgress } from "@mui/material";

import sx from "./PageLoading.sx";

export function PageLoading() {
    return (
        <Box sx={sx.container}>
            <CircularProgress disableShrink />
        </Box>
    );
}
