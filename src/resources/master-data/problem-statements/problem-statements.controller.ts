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
import { ProblemStatementsService } from './problem-statements.service';
import { CreateProblemStatementDto } from './dto/create-problem-statement.dto';
import { UpdateProblemStatementDto } from './dto/update-problem-statement.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';
import { ResponseEntity } from 'src/lib/entities';
import { ProblemStatementEntity } from './entities';
import { QueryProblemStatementDto } from './dto';
import { Prisma } from '@prisma/client';

@Controller({
  path: 'master-data/problem-statements',
  version: ['1.0.0'],
})
@ApiTags('problem-statements')
export class ProblemStatementsController {
  constructor(
    private readonly problemStatementsService: ProblemStatementsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createProblemStatementDto: CreateProblemStatementDto) {
    try {
      const problemStatement = await this.problemStatementsService.create(
        createProblemStatementDto,
      );

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new ProblemStatementEntity(problemStatement),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new problem statement cannot be created with this topic',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@Query() queryDto: QueryProblemStatementDto) {
    const problemStatements = await this.problemStatementsService.findAll(
      queryDto,
    );

    const items = new ProblemStatementEntity().collection(
      problemStatements.data,
    );

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
    const problemStatement = await this.problemStatementsService.findOne(id);

    if (!problemStatement) {
      throw new NotFoundException(
        `Problem Statement with ${id} does not exist.`,
      );
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new ProblemStatementEntity(problemStatement),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateProblemStatementDto: UpdateProblemStatementDto,
  ) {
    let problemStatement = await this.problemStatementsService.findOne(id);

    if (!problemStatement) {
      throw new NotFoundException(
        `Problem Statement with ${id} does not exist.`,
      );
    }

    problemStatement = await this.problemStatementsService.update(
      id,
      updateProblemStatementDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new ProblemStatementEntity(problemStatement),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let problemStatement = await this.problemStatementsService.findOne(id);

    if (!problemStatement) {
      throw new NotFoundException(
        `Problem Statement with ${id} does not exist.`,
      );
    }

    problemStatement = await this.problemStatementsService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new ProblemStatementEntity(problemStatement),
    });
  }
}
