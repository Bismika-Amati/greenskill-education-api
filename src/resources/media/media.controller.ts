import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  ServiceUnavailableException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { StorageFile } from 'src/storage/storage-file';
import { StorageService } from 'src/storage/storage.service';
import { UploadMediaDto } from './dto/upload-media.dto';
import { ResponseEntity } from 'src/lib/entities';

@Controller({
  path: 'media',
  version: ['1.0.0'],
})
@ApiTags('media')
export class MediaController {
  constructor(private storageService: StorageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      },
    }),
  )
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadMediaDto: UploadMediaDto,
  ) {
    const filename = `${
      uploadMediaDto.filePlace
    }/${new Date().getTime()}.${file.originalname.split('.').pop()}`;
    const filePath = `media/${filename}`;

    await this.storageService.save(filePath, file.mimetype, file.buffer, [
      { mediaId: filename },
    ]);

    return new ResponseEntity({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: `https://storage.googleapis.com/greenskilleducation/${filePath}`,
    });
  }

  // TODO: fix params get emdia
  @Get(':mediaId')
  async downloadMedia(@Param('mediaId') mediaId: string, @Res() res: Response) {
    let storageFile: StorageFile;
    try {
      storageFile = await this.storageService.get(`media/${mediaId}`);
    } catch (e) {
      if (e.message.toString().includes('No such object')) {
        throw new NotFoundException('image not found');
      } else {
        throw new ServiceUnavailableException('internal error');
      }
    }
    res.setHeader('Content-Type', storageFile.contentType);
    res.setHeader('Cache-Control', 'max-age=60d');
    res.end(storageFile.buffer);
  }
}
