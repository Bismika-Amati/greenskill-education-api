import { ApiProperty } from '@nestjs/swagger';
import { Village } from '@prisma/client';
import { CityEntity } from '../../regions/cities/entities';
import { DistrictEntity } from '../../regions/districts/entities';
import { SubDistrictEntity } from '../../regions/sub-districts/entities';
import { UserEntity } from '../../users/entities';

export class VillageEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  provinceId: string;

  @ApiProperty()
  cityId: string;

  @ApiProperty()
  districtId: string;

  @ApiProperty()
  subDistrictId: string;

  @ApiProperty()
  postcode: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  latlong: string;

  @ApiProperty()
  picId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty({ type: CityEntity })
  province: CityEntity;

  @ApiProperty({ type: CityEntity })
  city: CityEntity;

  @ApiProperty({ type: DistrictEntity })
  district: DistrictEntity;

  @ApiProperty({ type: SubDistrictEntity })
  subDistrict: SubDistrictEntity;

  @ApiProperty({ type: UserEntity })
  pic: UserEntity;

  constructor(partial?: Partial<VillageEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
  }

  mapper(item: Partial<VillageEntity>) {
    const { ...rest } = item;

    return {
      ...rest,
    };
  }

  collection(partials: Partial<Village[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
