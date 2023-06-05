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
  CreateSubModuleDto,
  QuerySubModuleDto,
  UpdateSubModuleDto,
} from './dto';
import { SubModuleEntity } from './entities';
import { SubModulesService } from './sub-modules.service';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/sub-modules',
  version: ['1.0.0'],
})
@ApiTags('sub-modules')
export class SubModulesController {
  constructor(private readonly subModuleService: SubModulesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createSubModuleDto: CreateSubModuleDto) {
    try {
      const subModule = await this.subModuleService.create(createSubModuleDto);

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new SubModuleEntity(subModule),
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
  async findAll(@Query() queryDto: QuerySubModuleDto) {
    const subModules = await this.subModuleService.findAll(queryDto);

    const items = new SubModuleEntity().collection(subModules.data);

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
      throw new NotFoundException(`SubModule with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new SubModuleEntity(subModule),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateSubModuleDto: UpdateSubModuleDto,
  ) {
    let subModule = await this.subModuleService.findOne(id);

    if (!subModule) {
      throw new NotFoundException(`SubModule with ${id} does not exist.`);
    }

    subModule = await this.subModuleService.update(id, updateSubModuleDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new SubModuleEntity(subModule),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let subModule = await this.subModuleService.findOne(id);

    if (!subModule) {
      throw new NotFoundException(`SubModule with ${id} does not exist.`);
    }

    subModule = await this.subModuleService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new SubModuleEntity(subModule),
    });
  }
}
