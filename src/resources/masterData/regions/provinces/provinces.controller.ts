import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProvinceEntity } from './entities/province.entity';
import { QueryProvinceDto } from './dto/query-province.dto';
import { ResponseEntity } from 'src/lib/entities';
import { Prisma } from '@prisma/client';

@Controller({
  path: 'master-data/regions/provinces',
  version: ['1.0.0'],
})
@ApiTags('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Post()
  async create(@Body() createProvinceDto: CreateProvinceDto) {
    try {
      const province = await this.provincesService.create(createProvinceDto);

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new ProvinceEntity(province),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new province cannot be created with this name',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(@Query() queryDto: QueryProvinceDto) {
    const provinces = await this.provincesService.findAll(queryDto);

    const items = new ProvinceEntity().collection(provinces.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: provinces.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const province = await this.provincesService.findOne(id);

    if (!province) {
      throw new NotFoundException(`Province with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new ProvinceEntity(province),
    });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ) {
    let province = await this.provincesService.findOne(id);

    if (!province) {
      throw new NotFoundException(`Province with ${id} does not exist.`);
    }

    province = await this.provincesService.update(id, updateProvinceDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new ProvinceEntity(province),
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    let province = await this.provincesService.findOne(id);

    if (!province) {
      throw new NotFoundException(`Province with ${id} does not exist.`);
    }

    province = await this.provincesService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new ProvinceEntity(province),
    });
  }
}
