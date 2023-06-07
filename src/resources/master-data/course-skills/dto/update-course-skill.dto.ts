import { PartialType } from '@nestjs/swagger';
import { CreateCourseSkillDto } from './create-course-skill.dto';

export class UpdateCourseSkillDto extends PartialType(CreateCourseSkillDto) {}
