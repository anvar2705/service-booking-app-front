import { Box, Typography } from "@mui/material";

import type { ResultProps } from "./types";

export function Result(props: ResultProps) {
    const { title, subTitle, extra, children } = props;

    return (
        <Box textAlign="center">
            {title ? (
                <Typography variant="h4" gutterBottom>
                    {title}
                </Typography>
            ) : null}
            {subTitle ? (
                <Typography variant="subtitle1" gutterBottom>
                    {subTitle}
                </Typography>
            ) : null}
            <Box>{children}</Box>
            {extra ? <Box>{extra}</Box> : null}
        </Box>
    );
}
