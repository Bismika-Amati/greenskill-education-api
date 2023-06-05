import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { RolesModule } from './resources/master-data/roles/roles.module';
import { ProvincesModule } from './resources/master-data/regions/provinces/provinces.module';
import { CitiesModule } from './resources/master-data/regions/cities/cities.module';
import { DistrictsModule } from './resources/master-data/regions/districts/districts.module';
import { SubDistrictsModule } from './resources/master-data/regions/sub-districts/sub-districts.module';
import { AuthModule } from './resources/auth/auth.module';
import { UsersModule } from './resources/master-data/users/users.module';
import { VillagesModule } from './resources/master-data/villages/villages.module';
import { ProblemStatementsModule } from './resources/master-data/problem-statements/problem-statements.module';
import { CustomerSegmentsModule } from './resources/master-data/customer-segments/customer-segments.module';
import { EarlyAdoptersModule } from './resources/master-data/early-adopters/early-adopters.module';
import { ExistingAlternativesModule } from './resources/master-data/existing-alternatives/existing-alternatives.module';
import { InterviewRecapsModule } from './resources/master-data/interview-recaps/interview-recaps.module';
import { ProblemsModule } from './resources/master-data/problems/problems.module';
import { IntervieweeCharacteristicsModule } from './resources/master-data/interviewee-characteristics/interviewee-characteristics.module';
import { CoursesModule } from './resources/master-data/courses/courses.module';

@Module({
  imports: [
    PrismaModule,
    RolesModule,
    ProvincesModule,
    CitiesModule,
    DistrictsModule,
    SubDistrictsModule,
    AuthModule,
    UsersModule,
    VillagesModule,
    ProblemStatementsModule,
    CustomerSegmentsModule,
    EarlyAdoptersModule,
    ExistingAlternativesModule,
    InterviewRecapsModule,
    ProblemsModule,
    IntervieweeCharacteristicsModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
