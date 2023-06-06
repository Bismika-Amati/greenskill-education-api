export const OrderBy = {
  CREATEDAT: 'createdAt',
  UPDATEDAT: 'updatedAt',
  NUMBER: 'number',
};

export type OrderBy = (typeof OrderBy)[keyof typeof OrderBy];
