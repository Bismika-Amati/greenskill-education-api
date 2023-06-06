import {
  Controller,
  Post,
  Body,
  HttpStatus,
  BadRequestException,
  Get,
  Query,
  Param,
  NotFoundException,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ResponseEntity } from 'src/lib/entities';
import {
  CreateArticleSubModuleDto,
  QueryArticleSubModuleDto,
  UpdateArticleSubModuleDto,
} from './dto';
import { ArticleSubModuleEntity } from './entities';
import { ArticleSubModulesService } from './article-sub-modules.service';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/article-sub-modules',
  version: ['1.0.0'],
})
@ApiTags('article-sub-modules')
export class ArticleSubModulesController {
  constructor(private readonly subModuleService: ArticleSubModulesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createArticleSubModuleDto: CreateArticleSubModuleDto) {
    try {
      const subModule = await this.subModuleService.create(
        createArticleSubModuleDto,
      );

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new ArticleSubModuleEntity(subModule),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new subModule cannot be created with this name',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(@Query() queryDto: QueryArticleSubModuleDto) {
    const subModules = await this.subModuleService.findAll(queryDto);

    const items = new ArticleSubModuleEntity().collection(subModules.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: subModules.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const subModule = await this.subModuleService.findOne(id);

    if (!subModule) {
      throw new NotFoundException(
        `ArticleSubModule with ${id} does not exist.`,
      );
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new ArticleSubModuleEntity(subModule),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateArticleSubModuleDto: UpdateArticleSubModuleDto,
  ) {
    let subModule = await this.subModuleService.findOne(id);

    if (!subModule) {
      throw new NotFoundException(
        `ArticleSubModule with ${id} does not exist.`,
      );
    }

    subModule = await this.subModuleService.update(
      id,
      updateArticleSubModuleDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new ArticleSubModuleEntity(subModule),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let subModule = await this.subModuleService.findOne(id);

    if (!subModule) {
      throw new NotFoundException(
        `ArticleSubModule with ${id} does not exist.`,
      );
    }

    subModule = await this.subModuleService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new ArticleSubModuleEntity(subModule),
    });
  }
}
