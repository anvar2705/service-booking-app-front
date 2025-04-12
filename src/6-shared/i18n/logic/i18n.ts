import { createInstance } from "i18next";
import ChainedBackend from "i18next-chained-backend";
import { initReactI18next } from "react-i18next";

import { config } from "./config";

export const i18n = createInstance();

void i18n.use(ChainedBackend).use(initReactI18next).init(config);
