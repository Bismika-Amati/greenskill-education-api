import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  HttpStatus,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { IntervieweeCharacteristicsService } from './interviewee-characteristics.service';
import { CreateIntervieweeCharacteristicDto } from './dto/create-interviewee-characteristic.dto';
import { UpdateIntervieweeCharacteristicDto } from './dto/update-interviewee-characteristic.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';
import { ResponseEntity } from 'src/lib/entities';
import { IntervieweeCharacteristicEntity } from './entities';
import { QueryIntervieweeCharacteristicDto } from './dto';
import { Prisma } from '@prisma/client';

@Controller({
  path: 'master-data/intervieweeCharacteristics',
  version: ['1.0.0'],
})
@ApiTags('intervieweeCharacteristics')
export class IntervieweeCharacteristicsController {
  constructor(
    private readonly intervieweeCharacteristicsService: IntervieweeCharacteristicsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(
    @Body()
    createIntervieweeCharacteristicDto: CreateIntervieweeCharacteristicDto,
  ) {
    try {
      const intervieweeCharacteristic =
        await this.intervieweeCharacteristicsService.create(
          createIntervieweeCharacteristicDto,
        );

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new IntervieweeCharacteristicEntity(intervieweeCharacteristic),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new intervieweeCharacteristic cannot be created with this topic',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@Query() queryDto: QueryIntervieweeCharacteristicDto) {
    const intervieweeCharacteristics =
      await this.intervieweeCharacteristicsService.findAll(queryDto);

    const items = new IntervieweeCharacteristicEntity().collection(
      intervieweeCharacteristics.data,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: intervieweeCharacteristics.meta,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const intervieweeCharacteristic =
      await this.intervieweeCharacteristicsService.findOne(id);

    if (!intervieweeCharacteristic) {
      throw new NotFoundException(
        `IntervieweeCharacteristic with ${id} does not exist.`,
      );
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new IntervieweeCharacteristicEntity(intervieweeCharacteristic),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body()
    updateIntervieweeCharacteristicDto: UpdateIntervieweeCharacteristicDto,
  ) {
    let intervieweeCharacteristic =
      await this.intervieweeCharacteristicsService.findOne(id);

    if (!intervieweeCharacteristic) {
      throw new NotFoundException(
        `IntervieweeCharacteristic with ${id} does not exist.`,
      );
    }

    intervieweeCharacteristic =
      await this.intervieweeCharacteristicsService.update(
        id,
        updateIntervieweeCharacteristicDto,
      );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new IntervieweeCharacteristicEntity(intervieweeCharacteristic),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let intervieweeCharacteristic =
      await this.intervieweeCharacteristicsService.findOne(id);

    if (!intervieweeCharacteristic) {
      throw new NotFoundException(
        `IntervieweeCharacteristic with ${id} does not exist.`,
      );
    }

    intervieweeCharacteristic =
      await this.intervieweeCharacteristicsService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new IntervieweeCharacteristicEntity(intervieweeCharacteristic),
    });
  }
}
