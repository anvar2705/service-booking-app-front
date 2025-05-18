import { FormModeEnum } from "./constants";

export type FormMode = (typeof FormModeEnum)[keyof typeof FormModeEnum];
