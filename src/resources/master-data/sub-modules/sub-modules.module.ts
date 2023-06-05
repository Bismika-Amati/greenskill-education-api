import { Module } from '@nestjs/common';
import { SubModulesService } from './sub-modules.service';
import { SubModulesController } from './sub-modules.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SubModulesController],
  providers: [SubModulesService],
  imports: [PrismaModule],
})
export class SubModulesModule {}
