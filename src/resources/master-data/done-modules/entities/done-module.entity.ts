import { ApiProperty } from '@nestjs/swagger';
import { DoneModule } from '@prisma/client';
import { UserEntity } from '../../users/entities';
import { SubModuleEntity } from '../../sub-modules/entities';

export class DoneModuleEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  subModuleId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  subModule: SubModuleEntity;

  constructor(partial?: Partial<DoneModuleEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
  }

  mapper(item: Partial<DoneModuleEntity>) {
    const { ...rest } = item;

    return {
      ...rest,
    };
  }

  collection(partials: Partial<DoneModule[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
