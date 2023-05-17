import { ApiProperty } from '@nestjs/swagger';
import { DistrictEntity } from '../../districts/entities/district.entity';
import { SubDistrict } from '@prisma/client';

export class SubDistrictEntity {
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
  districtId: string | null;

  @ApiProperty({ required: false, type: DistrictEntity })
  district?: DistrictEntity;

  constructor(partial?: Partial<SubDistrictEntity>) {
    if (!partial) return;

    const { district, ...data } = partial;

    Object.assign(this, this.mapper(data));

    if (district) {
      this.district = new DistrictEntity(district);
    }
  }

  mapper(item: Partial<SubDistrictEntity>) {
    const { id, name, district } = item;

    return {
      id,
      name,
      district,
    };
  }

  collection(partials: Partial<SubDistrict[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
