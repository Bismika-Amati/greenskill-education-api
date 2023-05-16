import { Province } from '@prisma/client';

export class ProvinceEntity {
  constructor(partial?: Partial<Province>) {
    if (partial) {
      Object.assign(this, this.mapper(partial));
    }
  }

  mapper(item: Partial<Province>) {
    const { id, name } = item;

    return {
      id,
      name,
    };
  }

  collection(partials: Partial<Province[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
