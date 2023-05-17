import { ApiProperty } from '@nestjs/swagger';
import { Province } from '@prisma/client';

export class ProvinceEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial?: Partial<ProvinceEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
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
