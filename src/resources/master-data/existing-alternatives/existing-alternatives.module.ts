import { Module } from '@nestjs/common';
import { ExistingAlternativesService } from './existing-alternatives.service';
import { ExistingAlternativesController } from './existing-alternatives.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ExistingAlternativesController],
  providers: [ExistingAlternativesService],
  imports: [PrismaModule],
})
export class ExistingAlternativesModule {}
