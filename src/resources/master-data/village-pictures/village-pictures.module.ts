import { Module } from '@nestjs/common';
import { VillagePicturesService } from './village-pictures.service';
import { VillagePicturesController } from './village-pictures.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [VillagePicturesController],
  providers: [VillagePicturesService],
  imports: [PrismaModule],
})
export class VillagePicturesModule {}
