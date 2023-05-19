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
import { CreateProvinceDto, QueryProvinceDto, UpdateProvinceDto } from './dto';
import { ProvinceEntity } from './entities';
import { ProvincesService } from './provinces.service';

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
  async findOne(@Param('id') id: string) {
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
    @Param('id') id: string,
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
  async remove(@Param('id') id: string) {
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
