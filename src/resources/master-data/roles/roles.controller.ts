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
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from './dto';
import { RoleEntity } from './entities';
import { RolesService } from './roles.service';

@Controller({
  path: 'master-data/roles',
  version: ['1.0.0'],
})
@ApiTags('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      const role = await this.rolesService.create(createRoleDto);

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new RoleEntity(role),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new role cannot be created with this name',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(@Query() queryDto: QueryRoleDto) {
    const roles = await this.rolesService.findAll(queryDto);

    const items = new RoleEntity().collection(roles.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: roles.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role = await this.rolesService.findOne(id);

    if (!role) {
      throw new NotFoundException(`Role with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new RoleEntity(role),
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    let role = await this.rolesService.findOne(id);

    if (!role) {
      throw new NotFoundException(`Role with ${id} does not exist.`);
    }

    role = await this.rolesService.update(id, updateRoleDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new RoleEntity(role),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let role = await this.rolesService.findOne(id);

    if (!role) {
      throw new NotFoundException(`Role with ${id} does not exist.`);
    }

    role = await this.rolesService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new RoleEntity(role),
    });
  }
}
