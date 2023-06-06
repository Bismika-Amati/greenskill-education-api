import { ApiProperty } from '@nestjs/swagger';
import { VillageEntity } from '../../villages/entities';
import { VillagePicture } from '@prisma/client';

export class VillagePictureEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  villageId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  village: VillageEntity;

  constructor(partial?: Partial<VillagePictureEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
  }

  mapper(item: Partial<VillagePictureEntity>) {
    const { ...rest } = item;

    return {
      ...rest,
    };
  }

  collection(partials: Partial<VillagePicture[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
