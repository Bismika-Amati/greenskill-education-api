import { Injectable } from '@nestjs/common';
import { CreateCustomerSegmentDto } from './dto/create-customer-segment.dto';
import { UpdateCustomerSegmentDto } from './dto/update-customer-segment.dto';
import { CustomerSegment, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryCustomerSegmentDto } from './dto';

@Injectable()
export class CustomerSegmentsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCustomerSegmentDto: CreateCustomerSegmentDto,
  ): Promise<CustomerSegment> {
    return await this.prisma.customerSegment.create({
      data: createCustomerSegmentDto,
    });
  }

  async findAll(
    queryDto: QueryCustomerSegmentDto,
  ): Promise<PaginatedResult<CustomerSegment>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<CustomerSegment, Prisma.CustomerSegmentFindManyArgs>(
      this.prisma.province,
      {
        where: {
          title: {
            contains: queryDto.search,
            mode: 'insensitive',
          },
        },
        orderBy: queryDto.getOrderBy,
      },
    );
  }

  async findOne(id: string): Promise<CustomerSegment | null> {
    return await this.prisma.customerSegment.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateCustomerSegmentDto: UpdateCustomerSegmentDto,
  ): Promise<CustomerSegment> {
    return await this.prisma.customerSegment.update({
      where: { id },
      data: updateCustomerSegmentDto,
    });
  }

  async remove(id: string): Promise<CustomerSegment> {
    return await this.prisma.customerSegment.delete({
      where: { id },
    });
  }
}
