import { Test, TestingModule } from '@nestjs/testing';
import { InterviewRecapsController } from './interview-recaps.controller';
import { InterviewRecapsService } from './interview-recaps.service';

describe('InterviewRecapsController', () => {
  let controller: InterviewRecapsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewRecapsController],
      providers: [InterviewRecapsService],
    }).compile();

    controller = module.get<InterviewRecapsController>(InterviewRecapsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
