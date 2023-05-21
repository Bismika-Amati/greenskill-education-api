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
import { DistrictsService } from './districts.service';
import { CreateDistrictDto, QueryDistrictDto, UpdateDistrictDto } from './dto';
import { DistrictEntity } from './entities';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/regions/districts',
  version: ['1.0.0'],
})
@ApiTags('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
