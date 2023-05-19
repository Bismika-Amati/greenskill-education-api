import { Injectable } from '@nestjs/common';
import { Role, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.prisma.role.create({ data: createRoleDto });
  }

  async findAll(queryDto: QueryRoleDto): Promise<PaginatedResult<Role>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<Role, Prisma.RoleFindManyArgs>(this.prisma.role, {
      where: {
        name: {
          contains: queryDto.search,
          mode: 'insensitive',
        },
        deletedAt: null,
      },
      orderBy: queryDto.getOrderBy,
    });
  }

  async findOne(id: string): Promise<Role | null> {
    return await this.prisma.role.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return await this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: string): Promise<Role> {
    return await this.prisma.role.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
