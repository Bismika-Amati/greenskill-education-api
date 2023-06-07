import { Module } from '@nestjs/common';
import { CourseSkillsService } from './course-skills.service';
import { CourseSkillsController } from './course-skills.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CourseSkillsController],
  providers: [CourseSkillsService],
  imports: [PrismaModule],
})
export class CourseSkillsModule {}
