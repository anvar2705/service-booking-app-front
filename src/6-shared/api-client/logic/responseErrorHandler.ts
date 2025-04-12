import { enqueueSnackbar } from "notistack";

import { STRONG_ERROR_MESSAGE_DURATION, TagTypesEnum } from "../constants";
import { queryClient } from "../queryClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const responseErrorHandler = (error: any) => {
    if (error.status === 401) {
        void queryClient.invalidateQueries({
            queryKey: [TagTypesEnum.ACCESS_TOKEN],
        });
    }

    try {
        let message: string;
        let status: number | string = error.status;

        message = "error" in error.response.data ? error.response.data.error : error.response.data.message;

        try {
            const errorJSON = JSON.parse(message.replace(/^[^{]*/, ""));
            message = errorJSON?.error?.reason ?? message;
            status = (errorJSON?.status as number) ?? status;
        } catch (error) {
            console.error(error);
        }

        enqueueSnackbar(message, {
            variant: status === 500 ? "error" : "warning",
            autoHideDuration: status === 500 ? STRONG_ERROR_MESSAGE_DURATION : undefined,
        });
    } catch (error) {
        console.info(error);
        throw error;
    }
};
