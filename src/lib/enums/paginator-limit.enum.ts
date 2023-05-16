export const PaginatorLimit = {
  SMALL: 15,
  MEDIUM: 25,
  LARGE: 50,
};

export type PaginatorLimit =
  (typeof PaginatorLimit)[keyof typeof PaginatorLimit];
