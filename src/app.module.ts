import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { RolesModule } from './resources/masterData/roles/roles.module';
import { ProvincesModule } from './resources/masterData/regions/provinces/provinces.module';
import { CitiesModule } from './resources/masterData/regions/cities/cities.module';
import { DistrictsModule } from './resources/masterData/regions/districts/districts.module';

@Module({
  imports: [
    PrismaModule,
    RolesModule,
    ProvincesModule,
    CitiesModule,
    DistrictsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
