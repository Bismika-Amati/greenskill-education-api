import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { VillagesService } from './villages.service';
import { CreateVillageDto } from './dto/create-village.dto';
import { UpdateVillageDto } from './dto/update-village.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryVillageDto } from './dto/query-village.dto';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';
import { VillageEntity } from './entities';
import { ResponseEntity } from 'src/lib/entities';
import { Prisma } from '@prisma/client';

@Controller({
  path: 'master-data/villages',
  version: ['1.0.0'],
})
@ApiTags('villages')
export class VillagesController {
  constructor(private readonly villagesService: VillagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createVillageDto: CreateVillageDto) {
    try {
      const user = await this.villagesService.create(createVillageDto);

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new VillageEntity(user),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new user cannot be created with this name',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@Query() queryDto: QueryVillageDto) {
    const villages = await this.villagesService.findAll(queryDto);

    const items = new VillageEntity().collection(villages.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: villages.meta,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const user = await this.villagesService.findOne(id);

    if (!user) {
      throw new NotFoundException(`Village with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new VillageEntity(user),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateVillageDto: UpdateVillageDto,
  ) {
    let user = await this.villagesService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist.`);
    }

    user = await this.villagesService.update(id, updateVillageDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new VillageEntity(user),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let user = await this.villagesService.findOne(id);

    if (!user) {
      throw new NotFoundException(`Village with ${id} does not exist.`);
    }

    user = await this.villagesService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new VillageEntity(user),
    });
  }
}
