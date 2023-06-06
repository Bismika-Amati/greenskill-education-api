import { Injectable } from '@nestjs/common';
import { VillagePicture, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateVillagePictureDto,
  QueryVillagePictureDto,
  UpdateVillagePictureDto,
} from './dto';

@Injectable()
export class VillagePicturesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createVillagePictureDto: CreateVillagePictureDto,
  ): Promise<VillagePicture> {
    return await this.prisma.villagePicture.create({
      data: createVillagePictureDto,
    });
  }

  async findAll(
    queryDto: QueryVillagePictureDto,
  ): Promise<PaginatedResult<VillagePicture>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<VillagePicture, Prisma.VillagePictureFindManyArgs>(
      this.prisma.villagePicture,
      {
        where: {
          photo: {
            contains: queryDto.search,
            mode: 'insensitive',
          },
          villageId: queryDto.villageId,
        },
        orderBy: queryDto.getOrderBy,
      },
    );
  }

  async findOne(id: string): Promise<VillagePicture | null> {
    return await this.prisma.villagePicture.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateVillagePictureDto: UpdateVillagePictureDto,
  ): Promise<VillagePicture> {
    return await this.prisma.villagePicture.update({
      where: { id },
      data: updateVillagePictureDto,
    });
  }

  async remove(id: string): Promise<VillagePicture> {
    return await this.prisma.villagePicture.delete({
      where: { id },
    });
  }
}
