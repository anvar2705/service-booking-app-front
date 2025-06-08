import { WorkflowDate } from "@shared/utils";

import { ServiceTypeEnum } from "./constants";

export interface ServiceModel extends WorkflowDate {
    uuid: string;
    name: string;
    price_from: number;
    price_to: number | null;
    duration: number;
    type: ServiceType;
}

export type ServiceType = (typeof ServiceTypeEnum)[keyof typeof ServiceTypeEnum];
