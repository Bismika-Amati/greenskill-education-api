import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { RolesModule } from './resources/masterData/roles/roles.module';
import { ProvincesModule } from './resources/masterData/regions/provinces/provinces.module';
import { CitiesModule } from './resources/masterData/regions/cities/cities.module';

@Module({
  imports: [PrismaModule, RolesModule, ProvincesModule, CitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
