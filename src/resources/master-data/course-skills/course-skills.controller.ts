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
  CreateCourseSkillDto,
  QueryCourseSkillDto,
  UpdateCourseSkillDto,
} from './dto';
import { CourseSkillEntity } from './entities';
import { CourseSkillsService } from './course-skills.service';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/course-skills',
  version: ['1.0.0'],
})
@ApiTags('course-skills')
export class CourseSkillsController {
  constructor(private readonly couseSkillsService: CourseSkillsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createCourseSkillDto: CreateCourseSkillDto) {
    try {
      const couseSkill = await this.couseSkillsService.create(
        createCourseSkillDto,
      );

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new CourseSkillEntity(couseSkill),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new couseSkill cannot be created with this name',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@Query() queryDto: QueryCourseSkillDto) {
    const couseSkills = await this.couseSkillsService.findAll(queryDto);

    const items = new CourseSkillEntity().collection(couseSkills.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: couseSkills.meta,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const couseSkill = await this.couseSkillsService.findOne(id);

    if (!couseSkill) {
      throw new NotFoundException(`CourseSkill with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new CourseSkillEntity(couseSkill),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateCourseSkillDto: UpdateCourseSkillDto,
  ) {
    let couseSkill = await this.couseSkillsService.findOne(id);

    if (!couseSkill) {
      throw new NotFoundException(`CourseSkill with ${id} does not exist.`);
    }

    couseSkill = await this.couseSkillsService.update(id, updateCourseSkillDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new CourseSkillEntity(couseSkill),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let couseSkill = await this.couseSkillsService.findOne(id);

    if (!couseSkill) {
      throw new NotFoundException(`CourseSkill with ${id} does not exist.`);
    }

    couseSkill = await this.couseSkillsService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new CourseSkillEntity(couseSkill),
    });
  }
}
