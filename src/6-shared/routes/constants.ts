export const APP_ROOT_ROUT_PATH = "/";

export const AuthenticationRoutePathEnum = Object.freeze({
    AUTH_ASTERISK: "/auth/*",
    AUTH_LOGIN: "/auth/login",
    LOGIN: "/login",
    ACCESS_DENIED: "/access-denied",
} as const);

export const SettingsRoutePathEnum = Object.freeze({
    SETTINGS_ASTERISK: "/settings/*",
    SETTINGS: "/settings",
    GO_TO_SETTINGS: "/settings",
} as const);

export const CalendarRoutePathEnum = Object.freeze({
    CALENDAR_ASTERISK: "/calendar/*",
    CALENDAR: "/calendar",
} as const);
