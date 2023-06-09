import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { RolesModule } from './resources/master-data/roles/roles.module';
import { ProvincesModule } from './resources/master-data/regions/provinces/provinces.module';
import { CitiesModule } from './resources/master-data/regions/cities/cities.module';
import { DistrictsModule } from './resources/master-data/regions/districts/districts.module';
import { SubDistrictsModule } from './resources/master-data/regions/sub-districts/sub-districts.module';

@Module({
  imports: [
    PrismaModule,
    RolesModule,
    ProvincesModule,
    CitiesModule,
    DistrictsModule,
    SubDistrictsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
