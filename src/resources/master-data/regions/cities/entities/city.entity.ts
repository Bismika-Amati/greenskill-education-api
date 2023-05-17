import { ApiProperty } from '@nestjs/swagger';
import { City } from '@prisma/client';
import { ProvinceEntity } from '../../provinces/entities/province.entity';

export class CityEntity {
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

  @ApiProperty({ required: false, nullable: true })
  provinceId: string | null;

  @ApiProperty({ required: false, type: ProvinceEntity })
  province?: ProvinceEntity;

  constructor(partial?: Partial<CityEntity>) {
    if (!partial) return;

    const { province, ...data } = partial;

    Object.assign(this, this.mapper(data));

    if (province) {
      this.province = new ProvinceEntity(province);
    }
  }

  mapper(item: Partial<CityEntity>) {
    const { id, name, province } = item;

    return {
      id,
      name,
      province,
    };
  }

  collection(partials: Partial<City[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
