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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ResponseEntity } from 'src/lib/entities';
import {
  CreateSubDistrictDto,
  QuerySubDistrictDto,
  UpdateSubDistrictDto,
} from './dto';
import { SubDistrictEntity } from './entities';
import { SubDistrictsService } from './sub-districts.service';

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
