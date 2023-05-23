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
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';
import { ResponseEntity } from 'src/lib/entities';
import { ProblemEntity } from './entities';
import { QueryProblemDto } from './dto';
import { Prisma } from '@prisma/client';

@Controller({
  path: 'master-data/problems',
  version: ['1.0.0'],
})
@ApiTags('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createProblemDto: CreateProblemDto) {
    try {
      const problem = await this.problemsService.create(createProblemDto);

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new ProblemEntity(problem),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new problem cannot be created with this topic',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@Query() queryDto: QueryProblemDto) {
    const problems = await this.problemsService.findAll(queryDto);

    const items = new ProblemEntity().collection(problems.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: problems.meta,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const problem = await this.problemsService.findOne(id);

    if (!problem) {
      throw new NotFoundException(`Problem with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new ProblemEntity(problem),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateProblemDto: UpdateProblemDto,
  ) {
    let problem = await this.problemsService.findOne(id);

    if (!problem) {
      throw new NotFoundException(`Problem with ${id} does not exist.`);
    }

    problem = await this.problemsService.update(id, updateProblemDto);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new ProblemEntity(problem),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let problem = await this.problemsService.findOne(id);

    if (!problem) {
      throw new NotFoundException(`Problem with ${id} does not exist.`);
    }

    problem = await this.problemsService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new ProblemEntity(problem),
    });
  }
}
