import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { QueryUserDto } from './dto';
import { hashPassword } from 'src/lib/helper';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await hashPassword(createUserDto.password);

    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(queryDto: QueryUserDto): Promise<PaginatedResult<User>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<User, Prisma.UserFindManyArgs>(this.prisma.user, {
      where: {
        fullname: {
          contains: queryDto.search,
          mode: 'insensitive',
        },
        deletedAt: null,
      },
      orderBy: queryDto.getOrderBy,
    });
  }

  async findOne(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        province: true,
        city: true,
        district: true,
        subDistrict: true,
        role: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
