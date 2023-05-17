import { Module } from '@nestjs/common';
import { SubDistrictsService } from './sub-districts.service';
import { SubDistrictsController } from './sub-districts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SubDistrictsController],
  providers: [SubDistrictsService],
  imports: [PrismaModule],
})
export class SubDistrictsModule {}
