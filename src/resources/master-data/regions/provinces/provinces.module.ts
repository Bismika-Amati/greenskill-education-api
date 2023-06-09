import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProvincesController],
  providers: [ProvincesService],
  imports: [PrismaModule],
})
export class ProvincesModule {}
