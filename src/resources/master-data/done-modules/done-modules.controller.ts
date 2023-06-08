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
  CreateDoneModuleDto,
  QueryDoneModuleDto,
  UpdateDoneModuleDto,
} from './dto';
import { DoneModuleEntity } from './entities';
import { DoneModulesService } from './done-modules.service';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/done-modules',
  version: ['1.0.0'],
})
@ApiTags('done-modules')
export class DoneModulesController {
  constructor(private readonly doneModulesService: DoneModulesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createDoneModuleDto: CreateDoneModuleDto) {
    try {
      const doneModule = await this.doneModulesService.create(
        createDoneModuleDto,
      );

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new DoneModuleEntity(doneModule),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new doneModule cannot be created with this name',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() queryDto: QueryDoneModuleDto) {
    const doneModules = await this.doneModulesService.findAll(queryDto);

    const items = new DoneModuleEntity().collection(doneModules.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: doneModules.meta,
    });
  }

  @Get(':id')
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const doneModule = await this.doneModulesService.findOne(id);

    if (!doneModule) {
      throw new NotFoundException(`DoneModule with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new DoneModuleEntity(doneModule),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateDoneModuleDto: UpdateDoneModuleDto,
  ) {
    let doneModule = await this.doneModulesService.findOne(id);

    if (!doneModule) {
      throw new NotFoundException(`DoneModule with ${id} does not exist.`);
    }

    doneModule = await this.doneModulesService.update(id, updateDoneModuleDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new DoneModuleEntity(doneModule),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let doneModule = await this.doneModulesService.findOne(id);

    if (!doneModule) {
      throw new NotFoundException(`DoneModule with ${id} does not exist.`);
    }

    doneModule = await this.doneModulesService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new DoneModuleEntity(doneModule),
    });
  }
}
