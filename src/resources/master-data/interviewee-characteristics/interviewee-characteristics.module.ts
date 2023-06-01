import { Module } from '@nestjs/common';
import { IntervieweeCharacteristicsService } from './interviewee-characteristics.service';
import { IntervieweeCharacteristicsController } from './interviewee-characteristics.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [IntervieweeCharacteristicsController],
  providers: [IntervieweeCharacteristicsService],
  imports: [PrismaModule],
})
export class IntervieweeCharacteristicsModule {}
