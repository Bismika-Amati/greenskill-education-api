import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProblemsController],
  providers: [ProblemsService],
  imports: [PrismaModule],
})
export class ProblemsModule {}
