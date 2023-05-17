import { ApiProperty } from '@nestjs/swagger';
import { District } from '@prisma/client';
import { CityEntity } from '../../cities/entities/city.entity';

export class DistrictEntity {
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
  cityId: string | null;

  @ApiProperty({ required: false, type: CityEntity })
  city?: CityEntity;

  constructor(partial?: Partial<DistrictEntity>) {
    if (!partial) return;

    const { city, ...data } = partial;

    Object.assign(this, this.mapper(data));

    if (city) {
      this.city = new CityEntity(city);
    }
  }

  mapper(item: Partial<DistrictEntity>) {
    const { id, name, city } = item;

    return {
      id,
      name,
      city,
    };
  }

  collection(partials: Partial<District[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
