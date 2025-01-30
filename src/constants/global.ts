export const productCategories: string[] = [
    "Notebooks",
    "Pens",
    "Pencils",
    "Markers",
    "Highlighters",
    "Erasers",
    "Sharpeners",
    "Rulers",
    "Staplers",
    "Paper Clips",
    "Sticky Notes",
    "Folders",
    "Binders",
    "Scissors",
    "Glue",
    "Tapes",
] as const;

export const Tags = {
    UpdateProfile: "UpdateProfile",
    Product: "Product",
    USER: "USER",
} as const;

export const limitPerPage = [5, 10, 20, 50]