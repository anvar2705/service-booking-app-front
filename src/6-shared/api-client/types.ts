import type { TagTypesEnum } from "./constants";

export type Token = string;
export type TokensData = { access_token: Token; refresh_token: Token };

export type AppTagType = (typeof TagTypesEnum)[keyof typeof TagTypesEnum];
