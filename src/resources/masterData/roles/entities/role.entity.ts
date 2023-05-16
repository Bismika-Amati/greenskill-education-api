import { Role } from '@prisma/client';

export class RoleEntity {
  constructor(partial?: Partial<Role>) {
    if (partial) {
      Object.assign(this, this.mapper(partial));
    }
  }

  mapper(item: Partial<Role>) {
    const { id, name } = item;

    return {
      id,
      name,
    };
  }

  collection(partials: Partial<Role[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
