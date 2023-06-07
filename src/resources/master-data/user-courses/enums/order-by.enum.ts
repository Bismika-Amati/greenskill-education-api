export const OrderBy = {
  CREATEDAT: 'createdAt',
  UPDATEDAT: 'updatedAt',
};

export type OrderBy = (typeof OrderBy)[keyof typeof OrderBy];
