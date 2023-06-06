import { PartialType } from '@nestjs/swagger';
import { CreateArticleSubModuleDto } from './create-article-sub-module.dto';

export class UpdateArticleSubModuleDto extends PartialType(
  CreateArticleSubModuleDto,
) {}
