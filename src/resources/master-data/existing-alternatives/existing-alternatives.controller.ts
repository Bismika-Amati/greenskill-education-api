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
import { ExistingAlternativesService } from './existing-alternatives.service';
import { CreateExistingAlternativeDto } from './dto/create-existing-alternative.dto';
import { UpdateExistingAlternativeDto } from './dto/update-existing-alternative.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ResponseEntity } from 'src/lib/entities';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';
import { QueryExistingAlternativeDto } from './dto';
import { ExistingAlternativeEntity } from './entities';

@Controller({
  path: 'master-data/existing-alternatives',
  version: ['1.0.0'],
})
@ApiTags('existing-alternatives')
export class ExistingAlternativesController {
  constructor(
    private readonly customerSegmentsService: ExistingAlternativesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createExistingAlternativeDto: CreateExistingAlternativeDto,
  ) {
    try {
      const existingAlternative = await this.customerSegmentsService.create(
        createExistingAlternativeDto,
      );

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new ExistingAlternativeEntity(existingAlternative),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new Existing Alternative cannot be created with this title',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@Query() queryDto: QueryExistingAlternativeDto) {
    const existingAlternatives = await this.customerSegmentsService.findAll(
      queryDto,
    );

    const items = new ExistingAlternativeEntity().collection(
      existingAlternatives.data,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: existingAlternatives.meta,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const existingAlternative = await this.customerSegmentsService.findOne(id);

    if (!existingAlternative) {
      throw new NotFoundException(
        `Existing Alternative with ${id} does not exist.`,
      );
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new ExistingAlternativeEntity(existingAlternative),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateExistingAlternativeDto: UpdateExistingAlternativeDto,
  ) {
    let existingAlternative = await this.customerSegmentsService.findOne(id);

    if (!existingAlternative) {
      throw new NotFoundException(
        `Existing Alternative with ${id} does not exist.`,
      );
    }

    existingAlternative = await this.customerSegmentsService.update(
      id,
      updateExistingAlternativeDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new ExistingAlternativeEntity(existingAlternative),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let existingAlternative = await this.customerSegmentsService.findOne(id);

    if (!existingAlternative) {
      throw new NotFoundException(
        `Existing Alternative with ${id} does not exist.`,
      );
    }

    existingAlternative = await this.customerSegmentsService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new ExistingAlternativeEntity(existingAlternative),
    });
  }
}
