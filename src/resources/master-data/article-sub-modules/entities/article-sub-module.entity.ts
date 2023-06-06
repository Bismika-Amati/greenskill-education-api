import { ApiProperty } from '@nestjs/swagger';
import { SubModuleEntity } from '../../sub-modules/entities';
import { ArticleSubModule } from '@prisma/client';

export class ArticleSubModuleEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  video?: string;

  @ApiProperty()
  picture?: string;

  @ApiProperty()
  subModuleId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  subModule: SubModuleEntity;

  constructor(partial?: Partial<ArticleSubModuleEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
  }

  mapper(item: Partial<ArticleSubModuleEntity>) {
    const { ...rest } = item;

    return {
      ...rest,
    };
  }

  collection(partials: Partial<ArticleSubModule[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
