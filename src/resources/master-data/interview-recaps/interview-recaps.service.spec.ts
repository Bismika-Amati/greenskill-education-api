import { Test, TestingModule } from '@nestjs/testing';
import { InterviewRecapsService } from './interview-recaps.service';

describe('InterviewRecapsService', () => {
  let service: InterviewRecapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterviewRecapsService],
    }).compile();

    service = module.get<InterviewRecapsService>(InterviewRecapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
