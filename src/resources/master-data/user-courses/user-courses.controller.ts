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
import {
  CreateUserCourseDto,
  QueryUserCourseDto,
  UpdateUserCourseDto,
} from './dto';
import { UserCourseEntity } from './entities';
import { UserCoursesService } from './user-courses.service';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/user-courses',
  version: ['1.0.0'],
})
@ApiTags('user-courses')
export class UserCoursesController {
  constructor(private readonly userCoursesService: UserCoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createUserCourseDto: CreateUserCourseDto) {
    try {
      const userCourse = await this.userCoursesService.create(
        createUserCourseDto,
      );

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new UserCourseEntity(userCourse),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new userCourse cannot be created with this name',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(@Query() queryDto: QueryUserCourseDto) {
    const userCourses = await this.userCoursesService.findAll(queryDto);

    const items = new UserCourseEntity().collection(userCourses.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: userCourses.meta,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userCourse = await this.userCoursesService.findOne(id);

    if (!userCourse) {
      throw new NotFoundException(`UserCourse with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new UserCourseEntity(userCourse),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateUserCourseDto: UpdateUserCourseDto,
  ) {
    let userCourse = await this.userCoursesService.findOne(id);

    if (!userCourse) {
      throw new NotFoundException(`UserCourse with ${id} does not exist.`);
    }

    userCourse = await this.userCoursesService.update(id, updateUserCourseDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new UserCourseEntity(userCourse),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let userCourse = await this.userCoursesService.findOne(id);

    if (!userCourse) {
      throw new NotFoundException(`UserCourse with ${id} does not exist.`);
    }

    userCourse = await this.userCoursesService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new UserCourseEntity(userCourse),
    });
  }
}
