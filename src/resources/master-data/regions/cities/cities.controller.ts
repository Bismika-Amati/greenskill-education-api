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
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from './entities/city.entity';
import { ResponseEntity } from 'src/lib/entities';
import { Prisma } from '@prisma/client';
import { QueryCityDto } from './dto/query-city.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'master-data/regions/cities',
  version: ['1.0.0'],
})
@ApiTags('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto) {
    try {
      const city = await this.citiesService.create(createCityDto);

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new CityEntity(city),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new city cannot be created with this name',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(@Query() queryDto: QueryCityDto) {
    const cities = await this.citiesService.findAll(queryDto);

    const items = new CityEntity().collection(cities.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: cities.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const city = await this.citiesService.findOne(id);

    if (!city) {
      throw new NotFoundException(`City with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new CityEntity(city),
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    let city = await this.citiesService.findOne(id);

    if (!city) {
      throw new NotFoundException(`City with ${id} does not exist.`);
    }

    city = await this.citiesService.update(id, updateCityDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new CityEntity(city),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let city = await this.citiesService.findOne(id);

    if (!city) {
      throw new NotFoundException(`City with ${id} does not exist.`);
    }

    city = await this.citiesService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new CityEntity(city),
    });
  }
}
