export const BUSINESS_ROLES = [
  "Operations",
  "Project Manager",
  "Management",
] as const;

export type BusinessRole = (typeof BUSINESS_ROLES)[number];

export const BUSINESS_ROLE = Object.freeze({
  operations: BUSINESS_ROLES[0],
  projectManager: BUSINESS_ROLES[1],
  management: BUSINESS_ROLES[2],
});

export const isBusinessRole = (value: unknown): value is BusinessRole => {
  return (
      typeof value === "string" &&
      (BUSINESS_ROLES as readonly string[]).includes(value)
  );
};
