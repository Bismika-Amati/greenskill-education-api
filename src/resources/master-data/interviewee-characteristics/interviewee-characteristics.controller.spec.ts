import { Test, TestingModule } from '@nestjs/testing';
import { IntervieweeCharacteristicsController } from './interviewee-characteristics.controller';
import { IntervieweeCharacteristicsService } from './interviewee-characteristics.service';

describe('IntervieweeCharacteristicsController', () => {
  let controller: IntervieweeCharacteristicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntervieweeCharacteristicsController],
      providers: [IntervieweeCharacteristicsService],
    }).compile();

    controller = module.get<IntervieweeCharacteristicsController>(IntervieweeCharacteristicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
