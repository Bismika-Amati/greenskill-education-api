import { Test, TestingModule } from '@nestjs/testing';
import { CourseSkillsController } from './course-skills.controller';
import { CourseSkillsService } from './course-skills.service';

describe('CourseSkillsController', () => {
  let controller: CourseSkillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseSkillsController],
      providers: [CourseSkillsService],
    }).compile();

    controller = module.get<CourseSkillsController>(CourseSkillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
