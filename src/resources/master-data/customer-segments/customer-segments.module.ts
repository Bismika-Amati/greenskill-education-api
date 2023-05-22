import { Module } from '@nestjs/common';
import { CustomerSegmentsService } from './customer-segments.service';
import { CustomerSegmentsController } from './customer-segments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CustomerSegmentsController],
  providers: [CustomerSegmentsService],
  imports: [PrismaModule],
})
export class CustomerSegmentsModule {}
