// Enum replacement pattern: runtime const + derived union type.
// Provides type safety and runtime validation without creating a
// runtime object.Import types with `import type`, values normally.

export const BUSINESS_ROLES = [
  "Operations",
  "Project Manager",
  "Management",
] as const;

export type BusinessRole = (typeof BUSINESS_ROLES)[number];

export const isBusinessRole = (value: unknown): value is BusinessRole => {
  return (
    typeof value === "string" &&
    (BUSINESS_ROLES as readonly string[]).includes(value)
  );
};
