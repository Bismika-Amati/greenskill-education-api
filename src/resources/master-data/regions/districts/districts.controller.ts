import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpStatus,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { DistrictEntity } from './entities/district.entity';
import { ResponseEntity } from 'src/lib/entities';
import { Prisma } from '@prisma/client';
import { QueryDistrictDto } from './dto/query-district.dto';
import { ApiTags } from '@nestjs/swagger';
import { DistrictsService } from './districts.service';

@Controller({
  path: 'master-data/regions/districts',
  version: ['1.0.0'],
})
@ApiTags('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Post()
  async create(@Body() createDistrictDto: CreateDistrictDto) {
    try {
      const district = await this.districtsService.create(createDistrictDto);

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new DistrictEntity(district),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new district cannot be created with this name',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(@Query() queryDto: QueryDistrictDto) {
    const districts = await this.districtsService.findAll(queryDto);

    const items = new DistrictEntity().collection(districts.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: districts.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const district = await this.districtsService.findOne(id);

    if (!district) {
      throw new NotFoundException(`District with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new DistrictEntity(district),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    let district = await this.districtsService.findOne(id);

    if (!district) {
      throw new NotFoundException(`District with ${id} does not exist.`);
    }

    district = await this.districtsService.update(id, updateDistrictDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new DistrictEntity(district),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let district = await this.districtsService.findOne(id);

    if (!district) {
      throw new NotFoundException(`District with ${id} does not exist.`);
    }

    district = await this.districtsService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new DistrictEntity(district),
    });
  }
}
