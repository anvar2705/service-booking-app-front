import type { LanguageNameEnum } from "./constants";

export type LanguageName = (typeof LanguageNameEnum)[keyof typeof LanguageNameEnum];
