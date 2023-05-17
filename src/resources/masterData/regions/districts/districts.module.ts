import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DistrictsController],
  providers: [DistrictsService],
  imports: [PrismaModule],
})
export class DistrictsModule {}
