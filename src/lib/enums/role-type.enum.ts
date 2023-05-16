export const RoleType = {
  ADMIN: 'admin',
  COLLEGE: 'college',
  PIC_VILLAGE: 'pic village',
};

export type RoleType = (typeof RoleType)[keyof typeof RoleType];
