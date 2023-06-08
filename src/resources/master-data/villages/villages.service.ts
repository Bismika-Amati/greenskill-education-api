import { Injectable } from '@nestjs/common';
import { CreateVillageDto } from './dto/create-village.dto';
import { UpdateVillageDto } from './dto/update-village.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryVillageDto } from './dto/query-village.dto';
import { Prisma, Village } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';

@Injectable()
export class VillagesService {
  constructor(private prisma: PrismaService) {}

  async create(createVillageDto: CreateVillageDto) {
    return await this.prisma.village.create({ data: createVillageDto });
  }

  async findAll(queryDto: QueryVillageDto): Promise<PaginatedResult<Village>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<Village, Prisma.VillageFindManyArgs>(
      this.prisma.village,
      {
        where: {
          name: {
            contains: queryDto.search,
            mode: 'insensitive',
          },
          picId: queryDto.picId,
        },
        orderBy: queryDto.getOrderBy,
      },
    );
  }

  async findOne(id: string): Promise<Village | null> {
    return await this.prisma.village.findUnique({
      where: { id },
      include: {
        province: true,
        city: true,
        district: true,
        subDistrict: true,
        pic: true,
        villagePicture: true,
        problemStatement: true,
      },
    });
  }

  async update(
    id: string,
    updateVillageDto: UpdateVillageDto,
  ): Promise<Village> {
    const village = await this.prisma.village.update({
      where: { id },
      data: updateVillageDto,
    });

    return village;
  }

  async remove(id: string): Promise<Village> {
    const village = await this.prisma.village.delete({
      where: { id },
    });

    return village;
  }
}
