export const RoleType = {
  ADMIN: 'admin',
  STUDENT: 'student',
  PIC_VILLAGE: 'pic village',
};

export type RoleType = (typeof RoleType)[keyof typeof RoleType];
