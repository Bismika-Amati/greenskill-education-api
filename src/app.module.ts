import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { RolesModule } from './resources/masterData/roles/roles.module';
import { ProvincesModule } from './resources/masterData/regions/provinces/provinces.module';

@Module({
  imports: [PrismaModule, RolesModule, ProvincesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
