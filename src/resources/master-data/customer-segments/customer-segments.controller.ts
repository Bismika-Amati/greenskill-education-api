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
import { CustomerSegmentsService } from './customer-segments.service';
import { CreateCustomerSegmentDto } from './dto/create-customer-segment.dto';
import { UpdateCustomerSegmentDto } from './dto/update-customer-segment.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ResponseEntity } from 'src/lib/entities';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';
import { QueryCustomerSegmentDto } from './dto';
import { CustomerSegmentEntity } from './entities';

@Controller({
  path: 'master-data/customer-segments',
  version: ['1.0.0'],
})
@ApiTags('customer-segments')
export class CustomerSegmentsController {
  constructor(
    private readonly customerSegmentsService: CustomerSegmentsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createCustomerSegmentDto: CreateCustomerSegmentDto) {
    try {
      const problemStatement = await this.customerSegmentsService.create(
        createCustomerSegmentDto,
      );

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new CustomerSegmentEntity(problemStatement),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new customer segement cannot be created with this title',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@Query() queryDto: QueryCustomerSegmentDto) {
    const problemStatements = await this.customerSegmentsService.findAll(
      queryDto,
    );

    const items = new CustomerSegmentEntity().collection(
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
    const problemStatement = await this.customerSegmentsService.findOne(id);

    if (!problemStatement) {
      throw new NotFoundException(
        `Customer Segement with ${id} does not exist.`,
      );
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new CustomerSegmentEntity(problemStatement),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateCustomerSegmentDto: UpdateCustomerSegmentDto,
  ) {
    let problemStatement = await this.customerSegmentsService.findOne(id);

    if (!problemStatement) {
      throw new NotFoundException(
        `Customer Segement with ${id} does not exist.`,
      );
    }

    problemStatement = await this.customerSegmentsService.update(
      id,
      updateCustomerSegmentDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new CustomerSegmentEntity(problemStatement),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let problemStatement = await this.customerSegmentsService.findOne(id);

    if (!problemStatement) {
      throw new NotFoundException(
        `Customer Segement with ${id} does not exist.`,
      );
    }

    problemStatement = await this.customerSegmentsService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new CustomerSegmentEntity(problemStatement),
    });
  }
}
