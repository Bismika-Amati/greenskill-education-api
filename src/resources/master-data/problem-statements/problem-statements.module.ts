import { Module } from '@nestjs/common';
import { ProblemStatementsService } from './problem-statements.service';
import { ProblemStatementsController } from './problem-statements.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProblemStatementsController],
  providers: [ProblemStatementsService],
  imports: [PrismaModule],
})
export class ProblemStatementsModule {}
