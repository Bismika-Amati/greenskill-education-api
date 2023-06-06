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
  CreateVillagePictureDto,
  QueryVillagePictureDto,
  UpdateVillagePictureDto,
} from './dto';
import { VillagePictureEntity } from './entities';
import { VillagePicturesService } from './village-pictures.service';
import { JwtAuthGuard } from 'src/resources/auth/jwt-auth.guard';

@Controller({
  path: 'master-data/village-pictures',
  version: ['1.0.0'],
})
@ApiTags('village-pictures')
export class VillagePicturesController {
  constructor(
    private readonly villagePicturesService: VillagePicturesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createVillagePictureDto: CreateVillagePictureDto) {
    try {
      const villagePicture = await this.villagePicturesService.create(
        createVillagePictureDto,
      );

      return new ResponseEntity({
        statusCode: HttpStatus.OK,
        message: 'created',
        data: new VillagePictureEntity(villagePicture),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'There is a unique constraint violation, a new villagePicture cannot be created with this name',
          );
        }
      }

      throw new BadRequestException(e.message);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@Query() queryDto: QueryVillagePictureDto) {
    const villagePictures = await this.villagePicturesService.findAll(queryDto);

    const items = new VillagePictureEntity().collection(villagePictures.data);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: items ?? [],
      meta: villagePictures.meta,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const villagePicture = await this.villagePicturesService.findOne(id);

    if (!villagePicture) {
      throw new NotFoundException(`VillagePicture with ${id} does not exist.`);
    }

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: new VillagePictureEntity(villagePicture),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateVillagePictureDto: UpdateVillagePictureDto,
  ) {
    let villagePicture = await this.villagePicturesService.findOne(id);

    if (!villagePicture) {
      throw new NotFoundException(`VillagePicture with ${id} does not exist.`);
    }

    villagePicture = await this.villagePicturesService.update(
      id,
      updateVillagePictureDto,
    );

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'updated',
      data: new VillagePictureEntity(villagePicture),
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    let villagePicture = await this.villagePicturesService.findOne(id);

    if (!villagePicture) {
      throw new NotFoundException(`VillagePicture with ${id} does not exist.`);
    }

    villagePicture = await this.villagePicturesService.remove(id);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'deleted',
      data: new VillagePictureEntity(villagePicture),
    });
  }
}
