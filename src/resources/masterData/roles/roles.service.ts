import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryRoleDto } from './dto/query-role.dto';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { Prisma, Role } from '@prisma/client';

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
        deletedAt: null,
      },
    });
  }

  async findOne(id: number): Promise<Role | null> {
    return await this.prisma.role.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    return await this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: number): Promise<Role> {
    return await this.prisma.role.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
