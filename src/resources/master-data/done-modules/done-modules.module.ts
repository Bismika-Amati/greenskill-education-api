import { Module } from '@nestjs/common';
import { DoneModulesService } from './done-modules.service';
import { DoneModulesController } from './done-modules.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DoneModulesController],
  providers: [DoneModulesService],
  imports: [PrismaModule],
})
export class DoneModulesModule {}
