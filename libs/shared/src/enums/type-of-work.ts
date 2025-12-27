// Enum replacement pattern: runtime const + derived union type.
// Provides type safety and runtime validation without creating a
// runtime object. Import types with `import type`, values normally.

export const TYPE_OF_WORK = [
    "Cabinetry",
    "Cleaning",
    "Concrete",
    "Counter Top",
    "Demo",
    "Drywall",
    "Exterior",
    "Finisher Millwork",
    "Fireplace",
    "Flooring",
    "Glass & Mirror",
    "Granite",
    "Hardwood Flooring",
    "HVAC & Plumber",
    "HVAC Only",
    "Insulation",
    "Labour (General)",
    "Painting",
    "Piers",
    "Repair / Handyman",
    "Roofing",
    "Screens",
    "Stairs",
    "Stone",
    "Windows & Doors",
    "Other",
] as const;

export type TypeOfWork = (typeof TYPE_OF_WORK)[number];

export const isTypeOfWork = (value: unknown): value is TypeOfWork => {
    return typeof value === "string" && (TYPE_OF_WORK as readonly string[]).includes(value);
};
