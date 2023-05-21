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
import { CitiesService } from './cities.service';
import { CreateCityDto, QueryCityDto, UpdateCityDto } from './dto';
import { CityEntity } from './entities';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/regions/cities',
  version: ['1.0.0'],
})
@ApiTags('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
