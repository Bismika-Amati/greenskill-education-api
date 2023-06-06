import { Injectable } from '@nestjs/common';
import { ArticleSubModule, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateArticleSubModuleDto,
  QueryArticleSubModuleDto,
  UpdateArticleSubModuleDto,
} from './dto';

@Injectable()
export class ArticleSubModulesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createArticleSubModuleDto: CreateArticleSubModuleDto,
  ): Promise<ArticleSubModule> {
    return await this.prisma.articleSubModule.create({
      data: createArticleSubModuleDto,
    });
  }

  async findAll(
    queryDto: QueryArticleSubModuleDto,
  ): Promise<PaginatedResult<ArticleSubModule>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<
      ArticleSubModule,
      Prisma.ArticleSubModuleFindManyArgs
    >(this.prisma.articleSubModule, {
      where: {
        title: {
          contains: queryDto.search,
          mode: 'insensitive',
        },
        subModuleId: queryDto.subModuleId,
      },
      orderBy: queryDto.getOrderBy,
    });
  }

  async findOne(id: string): Promise<ArticleSubModule | null> {
    return await this.prisma.articleSubModule.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateArticleSubModuleDto: UpdateArticleSubModuleDto,
  ): Promise<ArticleSubModule> {
    return await this.prisma.articleSubModule.update({
      where: { id },
      data: updateArticleSubModuleDto,
    });
  }

  async remove(id: string): Promise<ArticleSubModule> {
    return await this.prisma.articleSubModule.delete({
      where: { id },
    });
  }
}
