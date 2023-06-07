import { Test, TestingModule } from '@nestjs/testing';
import { CourseSkillsService } from './course-skills.service';

describe('CourseSkillsService', () => {
  let service: CourseSkillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseSkillsService],
    }).compile();

    service = module.get<CourseSkillsService>(CourseSkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
