import { Module } from '@nestjs/common';
import { VillagesService } from './villages.service';
import { VillagesController } from './villages.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [VillagesController],
  providers: [VillagesService],
  imports: [PrismaModule],
})
export class VillagesModule {}
