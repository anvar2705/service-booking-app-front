import { type PropsWithChildren } from "react";

import { FormModeEnum } from "./constants";

export interface CustomTabPanelProps extends PropsWithChildren {
    value: string;
    index: string;
}

export type FormMode = (typeof FormModeEnum)[keyof typeof FormModeEnum];
