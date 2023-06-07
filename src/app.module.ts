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
import { ExistingAlternativesModule } from './resources/master-data/existing-alternatives/existing-alternatives.module';
import { CoursesModule } from './resources/master-data/courses/courses.module';
import { SubModulesModule } from './resources/master-data/sub-modules/sub-modules.module';
import { StorageModule } from './storage/storage.module';
import { MediaModule } from './resources/media/media.module';
import { VillagePicturesModule } from './resources/master-data/village-pictures/village-pictures.module';
import { ArticleSubModulesModule } from './resources/master-data/article-sub-modules/article-sub-modules.module';
import { UserCoursesModule } from './resources/master-data/user-courses/user-courses.module';
import { CourseSkillsModule } from './resources/master-data/course-skills/course-skills.module';

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
    ExistingAlternativesModule,
    CoursesModule,
    SubModulesModule,
    StorageModule,
    MediaModule,
    VillagePicturesModule,
    ArticleSubModulesModule,
    UserCoursesModule,
    CourseSkillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
