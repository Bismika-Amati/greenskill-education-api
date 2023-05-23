import { Module } from '@nestjs/common';
import { EarlyAdoptersService } from './early-adopters.service';
import { EarlyAdoptersController } from './early-adopters.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EarlyAdoptersController],
  providers: [EarlyAdoptersService],
  imports: [PrismaModule],
})
export class EarlyAdoptersModule {}
