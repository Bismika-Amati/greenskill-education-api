import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EarlyAdoptersService } from './early-adopters.service';
import { CreateEarlyAdopterDto } from './dto/create-early-adopter.dto';
import { UpdateEarlyAdopterDto } from './dto/update-early-adopter.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ResponseEntity } from 'src/lib/entities';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';
import { QueryEarlyAdopterDto } from './dto';
import { EarlyAdopterEntity } from './entities';

@Controller({
  path: 'master-data/early-adopters',
  version: ['1.0.0'],
})
@ApiTags('early-adopters')
export class EarlyAdoptersController {
  constructor(private readonly customerSegmentsService: EarlyAdoptersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createEarlyAdopterDto: CreateEarlyAdopterDto) {
    try {
      const problemStatement = await this.customerSegmentsService.create(
        createEarlyAdopterDto,
      );

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new EarlyAdopterEntity(problemStatement),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new Early Adopter cannot be created with this title',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@Query() queryDto: QueryEarlyAdopterDto) {
    const problemStatements = await this.customerSegmentsService.findAll(
      queryDto,
    );

    const items = new EarlyAdopterEntity().collection(problemStatements.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: problemStatements.meta,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const problemStatement = await this.customerSegmentsService.findOne(id);

    if (!problemStatement) {
      throw new NotFoundException(`Early Adopter with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new EarlyAdopterEntity(problemStatement),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateEarlyAdopterDto: UpdateEarlyAdopterDto,
  ) {
    let problemStatement = await this.customerSegmentsService.findOne(id);

    if (!problemStatement) {
      throw new NotFoundException(`Early Adopter with ${id} does not exist.`);
    }

    problemStatement = await this.customerSegmentsService.update(
      id,
      updateEarlyAdopterDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new EarlyAdopterEntity(problemStatement),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let problemStatement = await this.customerSegmentsService.findOne(id);

    if (!problemStatement) {
      throw new NotFoundException(`Early Adopter with ${id} does not exist.`);
    }

    problemStatement = await this.customerSegmentsService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new EarlyAdopterEntity(problemStatement),
    });
  }
}
