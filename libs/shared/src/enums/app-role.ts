export const APP_ROLES = [
    "Admin",
    "User",
] as const;

export type AppRole = (typeof APP_ROLES)[number];

export const isAppRole = (value: unknown): value is AppRole => {
    return typeof value === "string" && (APP_ROLES as readonly string[]).includes(value);
};
