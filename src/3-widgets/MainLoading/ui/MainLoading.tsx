import { PropsWithChildren } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

import { useStore } from "../logic/store";

export const MainLoading = ({ children }: PropsWithChildren) => {
    const loading = useStore(({ loading }) => loading);

    return (
        <>
            {children}

            {loading && (
                <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open>
                    <CircularProgress />
                </Backdrop>
            )}
        </>
    );
};
