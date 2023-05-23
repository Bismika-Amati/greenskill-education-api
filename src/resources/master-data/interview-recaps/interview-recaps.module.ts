import { Module } from '@nestjs/common';
import { InterviewRecapsService } from './interview-recaps.service';
import { InterviewRecapsController } from './interview-recaps.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [InterviewRecapsController],
  providers: [InterviewRecapsService],
  imports: [PrismaModule],
})
export class InterviewRecapsModule {}
