import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  BadRequestException,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { SubDistrictsService } from './sub-districts.service';
import { CreateSubDistrictDto } from './dto/create-sub-district.dto';
import { UpdateSubDistrictDto } from './dto/update-sub-district.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/lib/entities';
import { SubDistrictEntity } from './entities/sub-district.entity';
import { Prisma } from '@prisma/client';
import { QuerySubDistrictDto } from './dto/query-sub-district.dto';

@Controller({
  path: 'master-data/regions/sub-districts',
  version: ['1.0.0'],
})
@ApiTags('sub-district')
export class SubDistrictsController {
  constructor(private readonly subDistrictsService: SubDistrictsService) {}

  @Post()
  async create(@Body() createSubDistrictDto: CreateSubDistrictDto) {
    try {
      const district = await this.subDistrictsService.create(
        createSubDistrictDto,
      );

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new SubDistrictEntity(district),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new sub district cannot be created with this name',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(@Query() queryDto: QuerySubDistrictDto) {
    const subDistricts = await this.subDistrictsService.findAll(queryDto);

    const items = new SubDistrictEntity().collection(subDistricts.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: subDistricts.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const district = await this.subDistrictsService.findOne(id);

    if (!district) {
      throw new NotFoundException(`District with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new SubDistrictEntity(district),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubDistrictDto: UpdateSubDistrictDto,
  ) {
    let subDistrict = await this.subDistrictsService.findOne(id);

    if (!subDistrict) {
      throw new NotFoundException(`Sub District with ${id} does not exist.`);
    }

    subDistrict = await this.subDistrictsService.update(
      id,
      updateSubDistrictDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new SubDistrictEntity(subDistrict),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let subDistrict = await this.subDistrictsService.findOne(id);

    if (!subDistrict) {
      throw new NotFoundException(`District with ${id} does not exist.`);
    }

    subDistrict = await this.subDistrictsService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new SubDistrictEntity(subDistrict),
    });
  }
}
