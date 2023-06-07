import { Module } from '@nestjs/common';
import { UserCoursesService } from './user-courses.service';
import { UserCoursesController } from './user-courses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserCoursesController],
  providers: [UserCoursesService],
  imports: [PrismaModule],
})
export class UserCoursesModule {}
