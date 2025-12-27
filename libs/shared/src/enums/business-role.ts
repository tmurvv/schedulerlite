export const BUSINESS_ROLES = [
    "Operations",
    "Project Manager",
    "Management",
] as const;

export type BusinessRole = (typeof BUSINESS_ROLES)[number];

export const isBusinessRole = (value: unknown): value is BusinessRole => {
    return typeof value === "string" && (BUSINESS_ROLES as readonly string[]).includes(value);
};
