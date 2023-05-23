import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InterviewRecapsService } from './interview-recaps.service';
import { CreateInterviewRecapDto } from './dto/create-interview-recap.dto';
import { UpdateInterviewRecapDto } from './dto/update-interview-recap.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryInterviewRecapDto } from './dto/query-interview-recap.dto';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';
import { InterviewRecapEntity } from './entities';
import { ResponseEntity } from 'src/lib/entities';
import { Prisma } from '@prisma/client';

@Controller({
  path: 'master-data/interview-recaps',
  version: ['1.0.0'],
})
@ApiTags('interview-recaps')
export class InterviewRecapsController {
  constructor(private readonly interviewRecaps: InterviewRecapsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createInterviewRecapDto: CreateInterviewRecapDto) {
    try {
      const interviewRecap = await this.interviewRecaps.create(
        createInterviewRecapDto,
      );

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new InterviewRecapEntity(interviewRecap),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new interviewRecap cannot be created with this name',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@Query() queryDto: QueryInterviewRecapDto) {
    const interviewRecaps = await this.interviewRecaps.findAll(queryDto);

    const items = new InterviewRecapEntity().collection(interviewRecaps.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: interviewRecaps.meta,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const interviewRecap = await this.interviewRecaps.findOne(id);

    if (!interviewRecap) {
      throw new NotFoundException(`InterviewRecap with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new InterviewRecapEntity(interviewRecap),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateInterviewRecapDto: UpdateInterviewRecapDto,
  ) {
    const interviewRecap = await this.interviewRecaps.update(
      id,
      updateInterviewRecapDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new InterviewRecapEntity(interviewRecap),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let interviewRecap = await this.interviewRecaps.findOne(id);

    if (!interviewRecap) {
      throw new NotFoundException(`InterviewRecap with ${id} does not exist.`);
    }

    interviewRecap = await this.interviewRecaps.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new InterviewRecapEntity(interviewRecap),
    });
  }
}
