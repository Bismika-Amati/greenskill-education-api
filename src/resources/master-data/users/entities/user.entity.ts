import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CityEntity } from '../../regions/cities/entities';
import { DistrictEntity } from '../../regions/districts/entities';
import { SubDistrictEntity } from '../../regions/sub-districts/entities';
import { RoleEntity } from '../../roles/entities';

export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  photo?: string;

  @ApiProperty({ required: true, nullable: false })
  roleId: string;

  @ApiProperty({ required: false, nullable: true })
  provinceId?: string;

  @ApiProperty({ required: false, nullable: true })
  cityId?: string;

  @ApiProperty({ required: false, nullable: true })
  districtId?: string;

  @ApiProperty({ required: false, nullable: true })
  subDistrictId?: string;

  @ApiProperty({ required: false, nullable: true })
  postcode?: string;

  @ApiProperty({ required: false, nullable: true })
  address?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty({ required: false, type: CityEntity })
  province?: CityEntity;

  @ApiProperty({ required: false, type: CityEntity })
  city?: CityEntity;

  @ApiProperty({ required: false, type: DistrictEntity })
  district?: DistrictEntity;

  @ApiProperty({ required: false, type: SubDistrictEntity })
  subDistrict?: SubDistrictEntity;

  @ApiProperty({ required: false, type: RoleEntity })
  role?: RoleEntity;

  constructor(partial?: Partial<UserEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
  }

  mapper(item: Partial<UserEntity>) {
    const { ...rest } = item;

    return {
      ...rest,
    };
  }

  collection(partials: Partial<User[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
