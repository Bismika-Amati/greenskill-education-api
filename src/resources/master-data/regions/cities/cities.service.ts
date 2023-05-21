import { Injectable } from '@nestjs/common';
import { City, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCityDto, QueryCityDto, UpdateCityDto } from './dto';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    return await this.prisma.city.create({ data: createCityDto });
  }

  async findAll(queryDto: QueryCityDto): Promise<PaginatedResult<City>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<City, Prisma.CityFindManyArgs>(this.prisma.city, {
      where: {
        name: {
          contains: queryDto.search,
          mode: 'insensitive',
        },
      },
      orderBy: queryDto.getOrderBy,
    });
  }

  async findOne(id: string): Promise<City | null> {
    return await this.prisma.city.findUnique({
      where: { id },
      include: {
        province: true,
      },
    });
  }

  async update(id: string, updateCityDto: UpdateCityDto): Promise<City> {
    return await this.prisma.city.update({
      where: { id },
      data: updateCityDto,
    });
  }

  async remove(id: string): Promise<City> {
    return await this.prisma.city.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
